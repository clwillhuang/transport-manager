import { Company } from '~shared/db/schema/company';
import { Station } from '../../db/schema/station'
import { CargoWaiting } from '~shared/db/schema/cargoWaiting';
import { Cargo } from '~shared/db/schema/cargo';
import { CargoToStationRelation } from '~shared/db/schema/cargoesToStationsRelations';

export type GETAllStationResponse = Station[]

export type GETOneStationResponseCargoEntry = {
    cargoType: Pick<Cargo, 'id' | 'name' | 'label'> & Pick<CargoToStationRelation, 'rating'>
    waiting: Array<CargoWaiting & {
        cargoFromStationWaiting: Pick<Station, 'id' | 'name' | 'x' | 'y'>,
        cargoViaStationWaiting: Pick<Station, 'id' | 'name' | 'x' | 'y'>,
    }>
}

export type GETOneStationResponse = Station & {
    owner: Company,
    waiting: Array<GETOneStationResponseCargoEntry>,
};