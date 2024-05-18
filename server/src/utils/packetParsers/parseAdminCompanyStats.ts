import { eq } from "~shared/drizzle-orm";
import { Company, companies } from "~shared/db/schema/company";
import { db } from "~shared/db/setup";

type CompanyStatsData = {
    companyId: number;
    trains: number;
    lorries: number;
    buses: number;
    ships: number;
    planes: number;
    trainStations: number;
    lorryStations: number;
    busStations: number;
    airports: number;
    harbors: number;
};

function isCompanyData(obj: any): obj is CompanyStatsData {
    return (
        typeof obj.companyId === 'number' &&
        typeof obj.trains === 'number' &&
        typeof obj.lorries === 'number' &&
        typeof obj.buses === 'number' &&
        typeof obj.ships === 'number' &&
        typeof obj.planes === 'number' &&
        typeof obj.trainStations === 'number' &&
        typeof obj.lorryStations === 'number' &&
        typeof obj.busStations === 'number' &&
        typeof obj.airports === 'number' &&
        typeof obj.harbors === 'number'
    );
}

export async function parseAdminCompanyStats(data: any, saveId: number): Promise<boolean> {
    if (!isCompanyData(data)) {
        throw new Error("Unexpected data.", data);
    }

    try {
        const insertedCompany: Company[] = await db
            .update(companies)
            .set({...data})
            .where(eq(companies.companyId, data.companyId))
            .returning();
        console.log(insertedCompany);
    } catch (err) {
        console.log("Failed to update company stats from data", data);
        console.log("Error", err);
    }

    return true;
}