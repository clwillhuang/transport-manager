import { Request, Response } from 'express';
import { Circle, circles } from '~shared/db/schema/circle';
import { db } from '~shared/db/setup';
import { and, eq } from '~shared/drizzle-orm';
import { GETAllCircleResponse, GETOneCircleResponse } from '~shared/api/schema/apiCircle';

export const circleCreateOne = async (req: Request, res: Response) => {
    try {
        const newcircle: Circle = req.body; // Assuming request body contains circle object
        newcircle.saveId = req.saveId;
        const createdcircle = await db.insert(circles).values(newcircle)
        res.status(201).json(createdcircle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const circleGetAll = async (req: Request, res: Response) => {
    try {
        const allcircles: GETAllCircleResponse = await db.select().from(circles).where(eq(circles.saveId, req.saveId));
        res.status(200).json(allcircles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const circleGetOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            const circle: GETOneCircleResponse = await db.query.circles.findFirst({
                where: and(eq(circles.id, id), eq(circles.saveId, req.saveId)),
            })
            res.status(200).json(circle);
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const circleUpdateOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            const circleUpdate: Circle = req.body; // Assuming request body contains updated circle object
            await db.update(circles)
                .set({ ...circleUpdate })
                .where(and(eq(circles.id, id), eq(circles.saveId, req.saveId)))
                .returning();
            res.status(200).json({ message: 'circle updated successfully' });
        } else {
            res.status(404).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const circleDeleteOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            await db.delete(circles).where(eq(circles.id, id));
            res.status(200).json({ message: 'circle deleted successfully' });
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


