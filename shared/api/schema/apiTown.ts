import { Town } from '../../db/schema/town'

export type GETAllTownResponse = Town[]

export type GETTownDirectoryResponse = {
    pages: number,
    total: number,
    data: Town[],
}

export type GETOneTownResponse = Town;