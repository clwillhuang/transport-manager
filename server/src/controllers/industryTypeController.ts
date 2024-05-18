import { Request, Response } from 'express';
import { IndustryType, industryTypes } from '~shared/db/schema/industryType';
import { db } from '~shared/db/setup';
import { and, count, countDistinct, eq, sql } from '~shared/drizzle-orm';
import { GETAllIndustryTypeResponse, GETOneIndustryTypeResponse } from '~shared/api/schema/apiIndustryType';
import { industries } from '~shared/db/schema/industry';

export const industryTypeCreateOne = async (req: Request, res: Response) => {
    try {
        const newIndustryType: IndustryType = req.body; // Assuming request body contains IndustryType object
        newIndustryType.saveId = req.saveId;
        const createdIndustryType = await db.insert(industryTypes).values(newIndustryType);
        res.status(201).json(createdIndustryType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const industryTypeGetAll = async (req: Request, res: Response) => {
    try {
        const allindustryTypes = await db
        .select()
        .from(industryTypes)
        .where(eq(industryTypes.saveId, req.saveId));
        const ins = await db.select({
            industryTypeId: industries.industryTypeId,
            count: sql<number>`cast(count(${industries.industryTypeId}) as int)`,
          })
            .from(industries)
            .groupBy(industries.industryTypeId);
        const result: GETAllIndustryTypeResponse = allindustryTypes.map(i => {
            const count: number = ins.find(x => x.industryTypeId === i.id)?.count
            return { ...i, count }
        })
        // const result: GETAllIndustryTypeResponse = await Promise.all(allindustryTypes.map(async (i) => {
        //     return await db.select({count: countDistinct(industries.id)}).from(industries).where(eq(industries.industryTypeId, i.id))
        // }))
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const industryTypeGetOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            const industryType = await db.query.industryTypes.findFirst({
                where: and(eq(industryTypes.id, id), eq(industryTypes.saveId, req.saveId)),
                with: {
                    cargoesToIndustryTypes: {
                        with: {
                            cargo: true
                        }
                    }
                }
            })
            const { cargoesToIndustryTypes, ...typeData } = industryType
            const result: GETOneIndustryTypeResponse = {
                accepts: cargoesToIndustryTypes.filter(o => o.accepts),
                produces: cargoesToIndustryTypes.filter(o => !o.accepts),
                ...typeData
            }
            res.status(200).json(result);
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const industryTypeUpdateOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            const industryTypeUpdate: IndustryType = req.body; // Assuming request body contains updated IndustryType object
            await db.update(industryTypes)
                .set({ ...industryTypeUpdate })
                .where(and(eq(industryTypes.id, id), eq(industryTypes.saveId, req.saveId)))
                .returning();
            res.status(200).json({ message: 'IndustryType updated successfully' });
        } else {
            res.status(404).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const industryTypeDeleteOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            await db.delete(industryTypes).where(eq(industryTypes.id, id));
            res.status(200).json({ message: 'IndustryType deleted successfully' });
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
