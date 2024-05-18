import { Request, Response } from 'express';
import { Town, towns } from '~shared/db/schema/town';
import { db } from '~shared/db/setup';
import { and, eq } from '~shared/drizzle-orm';
import { GETAllTownResponse, GETOneTownResponse } from '~shared/api/schema/apiTown';

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


