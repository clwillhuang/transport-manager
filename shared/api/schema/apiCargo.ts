import { IndustryType } from '../../db/schema/industryType'
import { Cargo } from '../../db/schema/cargo'

export type GETOneCargoResponse = Cargo & {
    producedBy: Array<IndustryType>,
    acceptedBy: Array<IndustryType>
};

export type GETAllCargoResponse = GETOneCargoResponse[]