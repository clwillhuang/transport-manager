import { db } from '~shared/db/setup';
import { IndustryType, industryTypes } from '~shared/db/schema/industryType';
import { saves } from '~shared/db/schema/save';
import { Cargo, cargoes } from '~shared/db/schema/cargo'
import { and, eq } from '~shared/drizzle-orm';
import { cargoesToIndustryTypes } from '~shared/db/schema/cargoesToIndustryTypesRelations';

interface IndustryTypeData {
    name: string;
    industryTypeId: number;
    hasHeliport: boolean;
    hasDock: boolean;
    produces: number[],
    accepts: number[]
}

function isIndustryTypeData(data: any): data is IndustryTypeData {
    return (
        typeof data.name === 'string' &&
        typeof data.industryTypeId === 'number' &&
        typeof data.hasHeliport === 'boolean' &&
        typeof data.hasDock === 'boolean' &&
        Array.isArray(data.produces) &&
        data.produces.every((item: any) => typeof item === 'number') &&
        Array.isArray(data.accepts) &&
        data.accepts.every((item: any) => typeof item === 'number')
    );
}

async function createM2MRelations(cargoIds: number[], industryTypeId: number, accepts: boolean, saveId: number) {
    for (const cargoId of cargoIds) {
        const cargo: Cargo = await db.query.cargoes.findFirst({
            where: and(eq(cargoes.cargoId, cargoId), eq(cargoes.saveId, saveId))
        });
        console.log(cargoId, cargo)

        if (cargo) {
            await db
                .insert(cargoesToIndustryTypes)
                .values({
                    cargoId: cargo.id,
                    industryTypeId: industryTypeId,
                    accepts: accepts
                })
                .onConflictDoNothing() // Assuming you don't want to update existing relations
        } else {
            throw Error(`Cargo with in-game cargo id "${cargoId}" not found.`);
        }
    }
}

export async function parseIndustryType(data: any, saveId: number) {
    if (!isIndustryTypeData(data)) {
        throw Error("Unexpected data.");
    }

    const {accepts, produces, ...tableData } = {...data, saveId}

    console.log(tableData)

    const insertedIndustryType: IndustryType[] = await db
    .insert(industryTypes)
    .values({ ...tableData })
    .returning()
    .onConflictDoUpdate({
        target: [industryTypes.saveId, industryTypes.industryTypeId],
        set: { ...tableData },
    })

    console.log(insertedIndustryType)

    await createM2MRelations(accepts, insertedIndustryType[0].id, true, saveId)    
    await createM2MRelations(produces, insertedIndustryType[0].id, false, saveId)    

    return true
}
