import { Save } from '../../db/schema/save'
import { Company } from '../../db/schema/company'


export type GETAllSaveResponse = Save[]

export type GETOneSaveResponse = Save & {
    companies: Company[]
};