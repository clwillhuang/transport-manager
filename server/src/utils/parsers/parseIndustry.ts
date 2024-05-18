import { db } from '~shared/db/setup';
import { Industry, industries } from '~shared/db/schema/industry';
import { IndustryType, industryTypes } from '~shared/db/schema/industryType';
import { and, eq } from '~shared/drizzle-orm';

interface IndustryData {
    industryId: number,
    name: string;
    construction_year: number;
    construction_day: number;
    construction_month: number;
    industryTypeId: number;
    x: number;
    y: number;
}

function isIndustryData(data: any): data is IndustryData {
    return (
        typeof data.name === 'string' &&
        typeof data.construction_year === 'number' &&
        typeof data.construction_day === 'number' &&
        typeof data.construction_month === 'number' &&
        typeof data.industryTypeId === 'number' &&
        typeof data.x === 'number' &&
        typeof data.y === 'number' && 
        typeof data.industryId === 'number'
    );
}

export async function parseIndustry(data: any, saveId: number) {
    if (!isIndustryData(data)) {
        throw Error("Unexpected data.");
    }
    const { construction_year, construction_month, construction_day, ...otherData } = data;
    const rowData: Omit<Industry, 'id'> = {
        ...otherData,
        constructionDate: new Date(construction_year, construction_month, construction_day)
    }
    // tableData.industryTypeId initially refers to type ID within the game
    // we need to replace it with the foreign key to the row in the db
    const industryType: IndustryType = await db.query.industryTypes.findFirst({
        where: and(
            eq(industryTypes.industryTypeId, rowData.industryTypeId),
            eq(industryTypes.saveId, saveId)
        )
    });
    if (industryType) {
        rowData.industryTypeId = industryType.id;
    } else {
        throw Error(`Ind Type with in-game id "${rowData.industryTypeId}" not found.`);
    }

    const industryAdded: Industry[] = await db
        .insert(industries)
        .values({...rowData})
        .returning()
        .onConflictDoUpdate({
            target: [industries.industryId, industries.industryTypeId],
            set: { ...rowData },
        })

    console.log(industryAdded)

    return true;
}
