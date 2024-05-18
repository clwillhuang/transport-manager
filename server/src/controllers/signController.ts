import { Request, Response } from 'express';
import { Sign, signs } from '~shared/db/schema/sign';
import { db } from '~shared/db/setup';
import { and, eq } from '~shared/drizzle-orm';
import { GETAllSignResponse, GETOneSignResponse} from '~shared/api/schema/apisign';

export const signCreateOne = async (req: Request, res: Response) => {
    try {
        const newsign: Sign = req.body; // Assuming request body contains sign object
        newsign.saveId = req.saveId;
        const createdsign = await db.insert(signs).values(newsign);
        res.status(201).json(createdsign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const signGetAll = async (req: Request, res: Response) => {
    try {
        const allsigns: GETAllSignResponse = await db.select().from(signs).where(eq(signs.saveId, req.saveId));
        res.status(200).json(allsigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const signGetOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            const sign: GETOneSignResponse = await db.query.signs.findFirst({
                where: and(eq(signs.id, id), eq(signs.saveId, req.saveId)),
            })
            res.status(200).json(sign);
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const signUpdateOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            const signUpdate: Sign = req.body; // Assuming request body contains updated sign object
            await db.update(signs)
                .set({ ...signUpdate })
                .where(and(eq(signs.id, id), eq(signs.saveId, req.saveId)))
                .returning();
            res.status(200).json({ message: 'sign updated successfully' });
        } else {
            res.status(404).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const signDeleteOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            await db.delete(signs).where(eq(signs.id, id));
            res.status(200).json({ message: 'sign deleted successfully' });
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


