import { db } from '~shared/db/setup';
import { Station, stations } from '~shared/db/schema/station';
import { and, eq } from '~shared/drizzle-orm';
import { companies } from '~shared/db/schema/company';

interface StationData {
    stationId: number,
    name: string;
    companyId: number;
    hasTra: boolean,
    hasTru: boolean,
    hasB: boolean,
    hasA: boolean,
    hasD: boolean,
    hasAny: boolean,
    x: number;
    y: number;
}

function isStationData(data: any): data is StationData {
  return (
    typeof data.stationId === 'number' &&
    typeof data.name === 'string' &&
    typeof data.companyId === 'number' &&
    typeof data.hasTra === 'boolean' &&
    typeof data.hasTru === 'boolean' &&
    typeof data.hasB === 'boolean' &&
    typeof data.hasA === 'boolean' &&
    typeof data.hasD === 'boolean' &&
    typeof data.x === 'number' &&
    typeof data.y === 'number'
  )
}

export async function parseStation(data: any, saveId: number): Promise<boolean> {
    if (!isStationData(data)) {
        throw new Error("Unexpected data.", data);
    }

    const { hasTra, hasTru, hasB, hasA, hasD, companyId, ...unchangedData } = data;
    const companyInstance = await db.query.companies.findFirst({
        where: and(eq(companies.companyId, companyId), eq(companies.saveId, saveId))
    })

    if (!companyInstance) {
        console.error(`Company with ID ${companyId} not found.`);
        return false;
    }

    const tableData: Omit<Station, 'id'> = {
        saveId,
        companyId: companyInstance.id,
        hasTrain: hasTra,
        hasTruck: hasTru,
        hasBus: hasB,
        hasDock: hasD,
        hasAirport: hasA,
        ...unchangedData
    }

    const insertedStation: Station[] = await db
        .insert(stations)
        .values({ ...tableData })
        .returning()
        .onConflictDoUpdate({
        target: [stations.saveId, stations.stationId],
        set: { ...tableData },
        });

    // console.log(insertedStation);

    return true;
}
