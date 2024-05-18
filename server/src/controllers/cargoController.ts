import { Request, Response } from 'express';
import { eq, and } from '~shared/drizzle-orm';
import { Cargo, cargoes } from '~shared/db/schema/cargo';
import { db } from '~shared/db/setup';
import { GETAllCargoResponse, GETOneCargoResponse } from '~shared/api/schema/apiCargo'

export const cargoCreateOne = async (req: Request, res: Response) => {
    try {
        const newCargo: Cargo = req.body; // Assuming request body contains Cargo object
        newCargo.saveId = req.saveId;
        const createdCargo = await db.insert(cargoes).values(newCargo);
        res.status(201).json(createdCargo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const cargoGetAll = async (req: Request, res: Response) => {
    try {
        const allCargoes = await db.query.cargoes.findMany({
            where: eq(cargoes.saveId, req.saveId),
            with: { 
                cargoesToIndustryTypes: {
                    with: {
                        industryType: true
                    }
                }
            }
        })
        const result: GETAllCargoResponse = allCargoes.map(cargo => {
            const { cargoesToIndustryTypes: industryTypes, ...cargoData } = cargo
            return {
                    acceptedBy: industryTypes.filter(relation => relation.accepts).map(relation => relation.industryType),
                    producedBy: industryTypes.filter(relation => !relation.accepts).map(relation => relation.industryType),
                    ...cargoData
                }
        })
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const cargoGetOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            const cargo = await db.query.cargoes.findFirst({
                where: and(eq(cargoes.id, id), eq(cargoes.saveId, req.saveId)),
                with: {
                    cargoesToIndustryTypes: {
                        with: {
                            industryType: true
                        }
                    }
                }
            })
            if (!cargo) {
                res.status(404).json();
                return;
            }
            const { cargoesToIndustryTypes: industryTypes, ...cargoData } = cargo
            const result: GETOneCargoResponse = {
                acceptedBy: industryTypes.filter(relation => relation.accepts).map(relation => relation.industryType),
                producedBy: industryTypes.filter(relation => !relation.accepts).map(relation => relation.industryType),
                ...cargoData
            }
            res.status(200).json(result);
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const cargoUpdateOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            const cargoUpdate: Cargo = req.body; // Assuming request body contains updated Cargo object
            await db.update(cargoes)
                .set({ ...cargoUpdate })
                .where(and(eq(cargoes.id, id), eq(cargoes.saveId, req.saveId)))
                .returning();
            res.status(200).json({ message: 'Cargo updated successfully' });
        } else {
            res.status(404).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const cargoDeleteOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            await db.delete(cargoes).where(eq(cargoes.id, id));
            res.status(200).json({ message: 'Cargo deleted successfully' });
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


