import { Request, Response } from 'express';
import { Town, towns } from '~shared/db/schema/town';
import { db } from '~shared/db/setup';
import { and, eq } from '~shared/drizzle-orm';
import { GETAllTownResponse, GETOneTownResponse } from '~shared/api/schema/apiTown';
import { countDistinct } from 'drizzle-orm';
import { desc } from 'drizzle-orm';
import { asc } from 'drizzle-orm';

export const townCreateOne = async (req: Request, res: Response) => {
    try {
        const newTown: Town = req.body; // Assuming request body contains Town object
        newTown.saveId = req.saveId;
        const createdTown = await db.insert(towns).values(newTown)
        res.status(201).json(createdTown);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const townGetAll = async (req: Request, res: Response) => {
    try {
        const alltowns: GETAllTownResponse = await db.select().from(towns).where(eq(towns.saveId, req.saveId));
        res.status(200).json(alltowns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const townGetDirectory = async (req: Request, res: Response) => {
    let page = 1, pageSize = 25, sort = '';
    try {
        // get page number from query params
        page = parseInt(req.query.page as string, 10) || page;
        pageSize = parseInt(req.query.size as string, 10) || pageSize;
        // get sort settings
        // Example: sort=-name,population  => sort descending by name first then ascending by population
        sort = req.query?.sort as string || '';
    } catch (error) {
        res.status(400).json({ message: 'Bad page number or page size.' });
        return;
    }
    const pages = await db.select({ count: countDistinct(towns.id) })
        .from(towns)
        .where(eq(towns.saveId, req.saveId));

    // create sorter (ex. [desc(towns.name), asc(towns.population)])
    const sortConstructor = sort.split(',').map(o => {
        if (o.startsWith('-')) {
            const key = o.substring(1);
            if (key in towns) return desc(towns[key as keyof Town]);
            else return null;
        } else {
            const key = o;
            if (key in towns) return asc(towns[key as keyof Town]);
            else return null;
        }
    }).filter(o => o !== null)

    const data = await db.select().from(towns)
        .where(eq(towns.saveId, req.saveId))
        .orderBy(...sortConstructor)
        .limit(pageSize)
        .offset((page - 1) * pageSize);

    res.status(200).json({ data, pages: Math.ceil(pages[0].count / pageSize), total: pages[0].count });
}


export const townGetOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            const town: GETOneTownResponse = await db.query.towns.findFirst({
                where: and(eq(towns.id, id), eq(towns.saveId, req.saveId))
            })
            res.status(200).json(town);
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const townUpdateOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            const townUpdate: Town = req.body; // Assuming request body contains updated Town object
            await db.update(towns)
                .set({ ...townUpdate })
                .where(and(eq(towns.id, id), eq(towns.saveId, req.saveId)))
                .returning();
            res.status(200).json({ message: 'Town updated successfully' });
        } else {
            res.status(404).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const townDeleteOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            await db.delete(towns).where(eq(towns.id, id));
            res.status(200).json({ message: 'Town deleted successfully' });
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


