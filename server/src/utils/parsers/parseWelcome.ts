import {db} from '~shared/db/setup'
import {saves} from '~shared/db/schema/save'

interface WelcomeData {
    serverName: string,
    gameVersion: string,
    dedicatedFlag: boolean,
    mapName: string,
    mapSeed: number,
    landscape: number,
    startDate: number,
    mapWidth: number,
    mapHeight: number
}

function isWelcomeData(data: any): data is WelcomeData {
    return (
        typeof data.serverName === 'string' &&
        typeof data.gameVersion === 'string' &&
        typeof data.dedicatedFlag === 'boolean' &&
        typeof data.mapName === 'string' &&
        typeof data.mapSeed === 'number' &&
        typeof data.landscape === 'number' &&
        typeof data.startDate === 'number' &&
        typeof data.mapWidth === 'number' &&
        typeof data.mapHeight === 'number'
    );
}
