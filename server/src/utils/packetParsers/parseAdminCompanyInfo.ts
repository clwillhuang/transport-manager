import { eq } from "~shared/drizzle-orm";
import { Company, companies } from "~shared/db/schema/company";
import { db } from "~shared/db/setup";

type CompanyInfoData = {
    companyId: number;
    name: string;
    managerName: string,
    color: number;
    password: boolean;
    startDate: number;
    isAI: boolean;
};

function isCompanyInfo(obj: any): obj is CompanyInfoData {
    return (
        typeof obj.companyId === 'number' &&
        typeof obj.name === 'string' &&
        typeof obj.managerName === 'string' &&
        typeof obj.color === 'number' &&
        typeof obj.password === 'boolean' &&
        typeof obj.startDate === 'number' &&
        typeof obj.isAI === 'boolean'
    );
}

export async function parseAdminCompanyInfo(data: any, saveId: number): Promise<boolean> {
    if (!isCompanyInfo(data)) {
        throw new Error("Unexpected data.", data);
    }

    let { startDate: startValue, password, ...tableData } = data;
    let startDate = new Date(startValue);
    let insertData = {...tableData, startDate: startDate, saveId: saveId }

    const insertedCompany: Company[] = await db
        .insert(companies)
        .values(insertData)
        .onConflictDoUpdate({
            target: [companies.companyId, companies.saveId],
            set: { 
                name: insertData.name,
                managerName: insertData.managerName,
                color: insertData.color,
                startDate: insertData.startDate,
                isAI: insertData.isAI,
            }
        })
        .returning();

    // console.log(insertedCompany);

    return true;
}