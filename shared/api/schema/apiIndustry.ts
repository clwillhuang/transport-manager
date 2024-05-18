import { Industry } from '../../db/schema/industry'
import { IndustryType } from '../../db/schema/industryType'
import { Cargo } from '../../db/schema/cargo'
import { CargoToIndustryType } from '../../db/schema/cargoesToIndustryTypesRelations'

export type GETAllIndustryResponse = Industry[]

export type GETOneIndustryResponse = Industry & {
    type: IndustryType & {
        accepts: Array<CargoToIndustryType & { cargo: Cargo }>;
        produces: Array<CargoToIndustryType & { cargo: Cargo }>;
    };
};