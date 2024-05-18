import { db } from '~shared/db/setup';
import { stations } from '~shared/db/schema/station';
import { and, eq, inArray } from '~shared/drizzle-orm';
import { cargoes } from '~shared/db/schema/cargo';
import { CargoWaiting, cargoWaiting } from '~shared/db/schema/cargoWaiting';
import { CargoToStationRelation, cargoesToStations } from '~shared/db/schema/cargoesToStationsRelations';

type FromData = [number, number]
type ViaData = [number, Array<FromData>]
type CargoData = [number, number, Array<ViaData>]

interface CargoWaitingAtViaFromData {
    id: number,
    date: string, '1999-12-31',
    cargos: Array<CargoData>
}

function isCargoWaitingAtViaFromData(data: any): data is CargoWaitingAtViaFromData {
    if (!(typeof data.id === 'number' && Array.isArray(data.cargos))) {
        return false;
    }
    for (const elem of data.cargos) {
        if (!Array.isArray(elem) || elem.length !== 3) return false;
        if (typeof elem[0] !== 'number' || typeof elem[1] !== 'number' || !Array.isArray(elem[2])) return false;
        for (const subElem of elem[2]) {
            if (typeof subElem[0] !== 'number' || !Array.isArray(subElem[1])) return false
            for (const subSubElem of subElem[1]) {
                if (subSubElem.length !== 2 || typeof subSubElem[0] !== 'number' || typeof subSubElem[1] !== 'number') return false
            }
        }
    }
    return true;
}

export async function parseCargoWaitingAtViaFrom(data: any, saveId: number): Promise<boolean> {
    console.log(data)
    if (!isCargoWaitingAtViaFromData(data)) {
        throw new Error("Unexpected data.", data);
    }

    // Fetch the station using data.id
    const atStation = await db.query.stations.findFirst({
        where: and(eq(stations.stationId, data.id), eq(stations.saveId, saveId))
    });

    const allViaAndFromStations = data.cargos.map(cargoItem => {
        const [cargo, rating, viaData] = cargoItem;
        return viaData.map(viaItem => {
            const [via, fromData ] = viaItem;
            const froms = fromData.map(fromItem => fromItem[0])
            return [via, froms].flat();
        }).flat()
    }).flat()

    console.log(allViaAndFromStations)

    const stationObjs = allViaAndFromStations.length > 0 ? await db.query.stations.findMany({ where: and(inArray(stations.stationId, allViaAndFromStations), eq(stations.saveId, saveId)) }) : []

    const date = new Date(data.date);
    
    for(const cargo of data.cargos) {
        const [cargoId, rating, viaData] = cargo;
        const cargoInstance = await db.query.cargoes.findFirst({ where: and(eq(cargoes.cargoId, cargoId), eq(cargoes.saveId, saveId)) });
        
        const newRatingData: Omit<CargoToStationRelation, 'id'> = {
            saveId: saveId,
            cargoId: cargoInstance.id,
            stationId: atStation.id,
            rating: rating,
            lastUpdated: date
        }
        await db.insert(cargoesToStations)
            .values(newRatingData)
            .returning()
            .onConflictDoUpdate({ 
                target: [cargoesToStations.stationId, cargoesToStations.cargoId],
                set: newRatingData 
            })
            
        for(const via of viaData) {
            const [viaId, fromData] = via;
            const viaInstance = viaId == 65535 ? atStation : stationObjs.find(station => station.stationId === viaId);
            if (!viaInstance) {
                console.warn(`Via station ${viaId} not found.`);
                continue;
            }
            for (const fromItem of fromData) {
                const [fromId, units] = fromItem;
                const fromInstance = stationObjs.find(station => station.stationId === fromId);
                const putData: Omit<CargoWaiting, 'id'> = { 
                    saveId: saveId,
                    atStationId: atStation.id,
                    fromStationId: fromInstance ? fromInstance.id : null,
                    viaStationId: viaInstance ? viaInstance.id : null,
                    cargoId: cargoInstance.id,
                    units: units,
                    lastUpdated: date 
                }
                await db.insert(cargoWaiting).values({...putData}).returning().onConflictDoUpdate({
                    target: [cargoWaiting.atStationId, cargoWaiting.fromStationId, cargoWaiting.viaStationId, cargoWaiting.cargoId],
                    set: putData
                })
            }
        }
    }

    return true;
}
