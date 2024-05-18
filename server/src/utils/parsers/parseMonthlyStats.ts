import { cargoes } from "~shared/db/schema/cargo";
import { industries } from "~shared/db/schema/industry";
import { MonthlyStats, monthlyStats } from "~shared/db/schema/monthlystats";
import { db } from "~shared/db/setup";
import { and, eq } from '~shared/drizzle-orm';

interface CargoStats {
    cargoId: number;
    stats: [number, number, number, number];
}

interface MonthlyStatsResult {
    industryId: number;
    monthlystats: CargoStats[];
    year: number;
    month: number;
}

function isMonthlyStats(obj: any): obj is MonthlyStatsResult {
    if (typeof obj !== 'object' || obj === null) return false;
    if (!('industryId' in obj) || !('monthlystats' in obj)) return false;
    if (typeof obj.industryId !== 'number') return false;
    if (typeof obj.month !== 'number') return false;
    if (typeof obj.year !== 'number') return false;
    if (!Array.isArray(obj.monthlystats)) return false;
    for (const stats of obj.monthlystats) {
        if (typeof stats !== 'object' || stats === null) return false;
        if (!('cargoId' in stats) || !('stats' in stats)) return false;
        if (typeof stats.cargoId !== 'number') return false;
        if (!Array.isArray(stats.stats) || stats.stats.length !== 4) return false;
        for (const stat of stats.stats) {
            if (typeof stat !== 'number') return false;
        }
    }
    return true;
}

export async function parseMonthlyStats(data: any, saveId: number) {
    if (!isMonthlyStats(data)) {
        throw Error("Unexpected data.", data);
    }

    console.log('received', data);

    const potential = await db.query.industries.findMany({
        where: eq(industries.industryId, data.industryId),
        with: {
            type: true
        }
    })
    const industry = potential.filter(p => p.type.saveId === saveId).at(0)

    if (!industry) {
        console.error(`Industry with ID ${data.industryId} not found.`);
        return false;
    }

    for (const stats of data.monthlystats) {
        const cargo = await db.query.cargoes.findFirst({
            where: and(eq(cargoes.cargoId, stats.cargoId), eq(cargoes.saveId, saveId))
        })
        if (!cargo) {
            console.error(`Cargo with ID ${stats.cargoId} not found.`);
            continue;
        }

        const rowData: Omit<MonthlyStats, 'id'> = {
            year: data.year,
            month: data.month, 
            industryId: industry.id,
            cargoId: cargo.id, 
            stockpiledCargo: stats.stats[0],
            lastMonthProduction: stats.stats[1],
            lastMonthTransported: stats.stats[2],
            lastMonthTransportedPercentage: stats.stats[3],
        };

        try {
            await db
                .insert(monthlyStats)
                .values({...rowData})
                .returning()
                .onConflictDoUpdate({
                    target: [monthlyStats.year, monthlyStats.month, monthlyStats.cargoId, monthlyStats.industryId],
                    set: { ...rowData },
                })
        } catch (error) {
            console.error(`Error inserting monthly stats for industry ${industry.id} and cargo ${cargo.id}: ${error}`);
        }
    }
}
