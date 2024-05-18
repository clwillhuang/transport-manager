import { and, eq } from 'drizzle-orm';
import { Cargo, cargoes } from '../db/schema/cargo'
import { industryTypes } from '../db/schema/industryType';
import { db } from '../db/setup'

export type CargoData = {
    penalty_lowerbound: number;
    single_penalty_length: number;
    price_factor: number;
}

export type TileCoordinate = { x: number, y: number}

export const calculateManhattanDistance = (p1: TileCoordinate, p2: TileCoordinate): number => {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

export abstract class Economy<T> {
    name: string;
    // maps industry type name to industry hex color
    industryHexColors: Record<string, string>; 
    cargoData: Record<string, T>;
    abstract calculatePaymentBySpeed(cargo: Cargo, units: number, speed: number, start: TileCoordinate, end: TileCoordinate);
    abstract calculatePaymentByTransitDays(cargo: Cargo, units: number, transitDays: number, start: TileCoordinate, end: TileCoordinate);
    async loadDataIntoDB(saveId: number) {
        // iterate through industryHexColors and add hexes on the matching rows for IndustryType
        for (let [industryType, hexColor] of Object.entries(this.industryHexColors)) {
            await db
                .update(industryTypes)
                .set({ hex: hexColor })
                .where(and(eq(industryTypes.name, industryType), eq(industryTypes.saveId, saveId)));
        }
        // iterate through cargo data entries and add data to the cargo row with label matching the key 
        for (let [cargoLabel, cargoData] of Object.entries(this.cargoData)) {
            await db
            .update(cargoes)
            .set({ grfData: cargoData })
            .where(and(eq(cargoes.label, cargoLabel), eq(cargoes.saveId, saveId)));
        }
    }
}

export type IndustryVersion = {
    version: string,
    // e.g. 4.12.2 or 4.6.12-4.7.10
    economies: Map<string, new () => Economy<any>>;
}

export type IndustryPack = {
    id: string;
    name: string;
    bananas?: string;
    forumLink?: string;
    versions: Array<IndustryVersion>;
}
