import { Company } from '../../db/schema/company';

export type GETAllCompanyResponse = Company[]

export type GETOneCompanyResponse = Company

export type GETCurrentCompanyResponse = Company | null;