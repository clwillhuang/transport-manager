import { Request, Response } from 'express';
import { Station, stations } from '~shared/db/schema/station';
import { db } from '~shared/db/setup';
import { and, eq, inArray } from '~shared/drizzle-orm';
import { Company } from '~shared/db/schema/company';
import { GETAllStationResponse, GETOneStationResponse } from '~shared/api/schema/apiStation';
import { cargoWaiting } from '~shared/db/schema/cargoWaiting';
import { cargoes } from '~shared/db/schema/cargo';

export const stationCreateOne = async (req: Request, res: Response) => {
    try {
        const newStation: Station = req.body; // Assuming request body contains Station object
        newStation.saveId = req.saveId;
        const createdStation = await db.insert(stations).values(newStation)
        res.status(201).json(createdStation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const stationGetAll = async (req: Request, res: Response) => {
    try {
        const allstations: GETAllStationResponse = await db.select().from(stations).where(eq(stations.saveId, req.saveId));
        res.status(200).json(allstations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const stationGetOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            const station = await db.query.stations.findFirst({
                where: and(eq(stations.id, id), eq(stations.saveId, req.saveId)),
                with: {
                    owner: true,
                    cargoStatistics: {
                        columns: {
                            cargoId: true,
                            rating: true,
                        }
                    }
                }
            })
            
            const waiting = await db.query.cargoWaiting.findMany({
                where: and(
                    eq(cargoWaiting.atStationId, station.id),
                    eq(cargoWaiting.saveId, req.saveId)
                ),
                with: {
                    cargoType: {
                        columns: {
                            id: true,
                            name: true,
                            label: true,
                        }
                    },
                    cargoFromStationWaiting: {
                        columns: {
                            id: true,
                            name: true,
                            x: true,
                            y: true,
                        }
                    },
                    cargoViaStationWaiting: {
                        columns: {
                            id: true,
                            name: true,
                            x: true,
                            y: true,
                        }
                    },
                }
            })

            // attach cargo stats to the matching cargo entry 
            const { cargoStatistics, ...stationData } = station
            const cargosIncluded = new Set(waiting.map(x => x.cargoId))
            const groupedByCargo = Array.from(cargosIncluded).map((cargo_id: number) => {
                const matchingCargo = cargoStatistics.find((c) => c.cargoId === cargo_id);
                if (!matchingCargo) {
                    return null
                }
                const matchingWaiting = waiting.filter(x => x.cargoId === cargo_id);
                const cargoData = matchingWaiting.at(0)
                return {
                    cargoType: {
                        id: matchingCargo.cargoId,
                        rating: matchingCargo.rating,
                        name: cargoData.cargoType.name,
                        label: cargoData.cargoType.label,
                    },
                    waiting: matchingWaiting.map((w) => {
                        const { cargoType, ...rest } = w;
                        return rest
                    })
                }
            }).filter(x => x !== null)
            
            const response: GETOneStationResponse = {
                ...stationData,
                waiting: groupedByCargo,
            }
            res.status(200).json(response);
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const stationUpdateOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            const stationUpdate: Station = req.body; // Assuming request body contains updated Station object
            await db.update(stations)
                .set({ ...stationUpdate })
                .where(and(eq(stations.id, id), eq(stations.saveId, req.saveId)))
                .returning();
            res.status(200).json({ message: 'Station updated successfully' });
        } else {
            res.status(404).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const stationDeleteOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            await db.delete(stations).where(eq(stations.id, id));
            res.status(200).json({ message: 'Station deleted successfully' });
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


