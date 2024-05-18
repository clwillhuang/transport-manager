import { Request, Response } from 'express';
import { Company, companies } from '~shared/db/schema/company';
import { db } from '~shared/db/setup';
import { and, eq } from '~shared/drizzle-orm';
import { GETAllCompanyResponse, GETCurrentCompanyResponse, GETOneCompanyResponse } from '~shared/api/schema/apiCompany';

export const companyCreateOne = async (req: Request, res: Response) => {
    try {
        const newCompany: Company = req.body; // Assuming request body contains Company object
        newCompany.saveId = req.saveId;
        const createdCompany = await db.insert(companies).values(newCompany);
        res.status(201).json(createdCompany);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const companyGetAll = async (req: Request, res: Response) => {
    try {
        const allcompanies: GETAllCompanyResponse = await db.select().from(companies).where(eq(companies.saveId, req.saveId));
        res.status(200).json(allcompanies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get the first company found in the save game, preferring non ai
export const companyGetCurrent = async(req: Request, res: Response) => {
    try {
        const nonAi: GETCurrentCompanyResponse = await db.query.companies.findFirst({
            where: and(eq(companies.isAI, true), eq(companies.saveId, req.saveId))
        })
        if (nonAi) {
            res.status(200).json(nonAi)
        } else {
            const aiCompany: GETCurrentCompanyResponse = await db.query.companies.findFirst({
                where: and(eq(companies.isAI, false), eq(companies.saveId, req.saveId))
            });
            if (aiCompany)
            res.status(200).json(aiCompany)
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const companyGetOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            const company = await db.query.companies.findFirst({
                where: and(eq(companies.id, id), eq(companies.saveId, req.saveId))
            })
            res.status(200).json(company);
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const companyUpdateOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            const companyUpdate: Company = req.body; // Assuming request body contains updated Company object
            await db.update(companies)
                .set({ ...companyUpdate })
                .where(and(eq(companies.id, id), eq(companies.saveId, req.saveId)))
                .returning();
            res.status(200).json({ message: 'Company updated successfully' });
        } else {
            res.status(404).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const companyDeleteOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (!isNaN(id)) {
            await db.delete(companies).where(eq(companies.id, id));
            res.status(200).json({ message: 'Company deleted successfully' });
        } else {
            res.status(400).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


