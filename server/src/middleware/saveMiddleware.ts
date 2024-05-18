import { NextFunction, Request, Response } from "express";
import { db } from "~shared/db/setup";
import { saves } from "~shared/db/schema/save";
import { eq } from '~shared/drizzle-orm';

export const requireSave = async (req: Request & {saveId?: number }, res: Response, next: NextFunction) => {
    const { saveGameId } = req.params;
    const parsedId = parseInt(saveGameId);
    if (isNaN(parsedId)) {
        return res.status(400).json({ message: 'You did not specify a save.'})
    } else {
        const save = await db.select().from(saves).where(eq(saves.id, parsedId));
        if (save) {
            // console.log(parsedId)
            req.saveId = parsedId;
            next()
        } else {
            return res.status(404).json({message: 'You did not specify a save.'})
        }
    }
};