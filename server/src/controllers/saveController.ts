import { Request, Response } from 'express';
import { Save, saves } from '~shared/db/schema/save';
import { db } from '~shared/db/setup';
import { eq } from '~shared/drizzle-orm';
import { GETAllSaveResponse, GETOneSaveResponse } from '~shared/api/schema/apiSave';


export const saveCreateOne = async (req: Request, res: Response) => {
    try {
        const newSave: Save = req.body; // Assuming request body contains Save object
        const createdSave = await db.insert(saves).values(newSave);
        res.status(201).json(createdSave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const saveGetAll = async (req: Request, res: Response) => {
    try {
        const allsaves: GETAllSaveResponse = await db.select().from(saves);
        res.status(200).json(allsaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const saveGetOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            const save: GETOneSaveResponse = await db.query.saves.findFirst({
                where: eq(saves.id, id),
                with: {
                    companies: true
                }
            })
            res.status(200).json(save);
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const saveUpdateOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            const saveUpdate: Save = req.body; // Assuming request body contains updated Save object
            await db.update(saves)
                .set({ ...saveUpdate })
                .where(eq(saves.id, id))
                .returning();
            res.status(200).json({ message: 'Save updated successfully' });
        } else {
            res.status(404).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const saveDeleteOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            await db.delete(saves).where(eq(saves.id, id));
            res.status(200).json({ message: 'Save deleted successfully' });
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


