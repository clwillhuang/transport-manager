import { Request, Response } from 'express';
import { IndustryType, industryTypes } from '~shared/db/schema/industryType';
import { CargoToIndustryType, cargoesToIndustryTypes } from '~shared/db/schema/cargoesToIndustryTypesRelations';
import { Industry, industries } from '~shared/db/schema/industry';
import { Cargo } from '~shared/db/schema/cargo';
import { db } from '~shared/db/setup';
import { inArray, eq, and } from '~shared/drizzle-orm'
import type { GETOneIndustryResponse } from '~shared/api/schema/apiIndustry'
import { countDistinct } from 'drizzle-orm';
import { desc } from 'drizzle-orm';
import { asc } from 'drizzle-orm';

export const industryCreateOne = async (req: Request, res: Response) => {
    try {
        const newIndustry: Industry = req.body; // Assuming request body contains Industry object
        const createdIndustry = await db.insert(industries).values(newIndustry);
        res.status(201).json(createdIndustry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const industryGetAll = async (req: Request, res: Response) => {
    try {
        const objs = await db.select({id: industryTypes.id}).from(industryTypes).where(
            eq(industryTypes.saveId, req.saveId)
        );
        const permitted = objs.map(o => o.id)
        if (permitted.length === 0) {
            res.status(200).json([]);
            return;
        } else {
            const allindustries = await db.select().from(industries).where(inArray(industries.industryTypeId, permitted));
            res.status(200).json(allindustries);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const industryGetDirectory = async (req: Request, res: Response) => {
    let page = 1, pageSize = 25, industryTypeId = null, sort = '';
    try {
        // get page number from query params
        page = parseInt(req.query.page as string, 10) || page;
        pageSize = parseInt(req.query.size as string, 10) || pageSize;
        // optional: show only one industry type
        if (req.query?.industry)
            industryTypeId = parseInt(req.query.industry as string, 10);
        if (isNaN(page) || isNaN(pageSize) || isNaN(industryTypeId)) { throw new Error(); }
        // get sort settings
        // Example: sort=-name  => sort descending by name first
        sort = req.query?.sort as string || '';
    } catch (error) {
        res.status(400).json({ message: 'Bad page number, page size or industry type.' });
        return;
    }

    // create sorter (ex. [desc(towns.name), asc(towns.population)])
    const sortConstructor = sort.split(',').map(o => {
        if (o.startsWith('-')) {
            const key = o.substring(1);
            if (key in industries) return desc(industries[key as keyof Industry]);
            else return null;
        } else {
            const key = o;
            if (key in industries) return asc(industries[key as keyof Industry]);
            else return null;
        }
    }).filter(o => o !== null)


    const industryData = industryTypeId === null ?
        await db.select({id: industryTypes.id}).from(industryTypes).where(
            eq(industryTypes.saveId, req.saveId)
        )
        :
        [{id: industryTypeId}]

    // also attach # of total pages to response
    const pages = await db.select({count: countDistinct(industries.id)}).from(industries).where(
        inArray(industries.industryTypeId, industryData.map(o => o.id))
    )
    const data = await db.select().from(industries).where(
        inArray(industries.industryTypeId, industryData.map(o => o.id)))
        .orderBy(...sortConstructor)
        .limit(pageSize)
        .offset((page - 1) * pageSize);

    res.status(200).json({ data, pages: Math.ceil(pages[0].count / pageSize), total: pages[0].count });
}

export const industryGetOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        const objs = await db.select({id: industryTypes.id}).from(industryTypes).where(eq(industryTypes.saveId, req.saveId));
        const permitted = objs.map(o => o.id)
        if (!isNaN(id)) {
            if (permitted.length === 0) {
                res.status(200).json([]);
                return
            }
            const industry: Industry & {
                type: IndustryType & { cargoesToIndustryTypes: Array<CargoToIndustryType & { cargo: Cargo }> }
            } = await db.query.industries.findFirst({
                where: and(eq(industries.id, id), inArray(industries.industryTypeId, permitted)),
                with: {
                    type: {
                        with: {
                            cargoesToIndustryTypes: {
                                with: {
                                    cargo: true
                                }
                            }
                        }
                    }
                }
            })
            const { type: industryType, ...industryData } = industry;
            const { cargoesToIndustryTypes: cargos, ...typeData } = industryType;

            const result: GETOneIndustryResponse = {
                type: {
                    accepts: cargos.filter((c: CargoToIndustryType) => c.accepts),
                    produces: cargos.filter((c: CargoToIndustryType) => !c.accepts),
                    ...typeData
                }, ...industryData
            }

            res.status(200).json({
                type: {
                    accepts: cargos.filter((c: CargoToIndustryType) => c.accepts),
                    produces: cargos.filter((c: CargoToIndustryType) => !c.accepts),
                    ...typeData
                }, ...industryData
            });
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const industryUpdateOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            const objs = await db.select({id: industryTypes.id}).from(industryTypes).where(eq(industryTypes.saveId, req.saveId));
            const permitted = objs.map(o => o.id);
            if (permitted.length === 0) {
                res.status(200).json([]);
                return
            }
            const industryUpdate: Industry = req.body; // Assuming request body contains updated Industry object
            await db.update(industries)
                .set({ ...industryUpdate })
                .where(and(eq(industries.id, id), inArray(industries.industryTypeId, permitted)))
                .returning();
            res.status(200).json({ message: 'Industry updated successfully' });
        } else {
            res.status(404).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const industryDeleteOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            await db.delete(industries).where(eq(industries.id, id));
            res.status(200).json({ message: 'Industry deleted successfully' });
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


