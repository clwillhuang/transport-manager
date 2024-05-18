import {db} from '~shared/db/setup'
import {Save, saves} from '~shared/db/schema/save'
import { GameConnection } from '../connection';

interface SaveData {
    gameVersion: string,
    dedicatedFlag: boolean,
    mapName: string,
    mapSeed: number,
    landscape: number,
    startDate: number,
    mapWidth: number,
    mapHeight: number
}

function isSaveData(data: any): data is SaveData {
    return (
        typeof data.gameVersion === 'string' &&
        typeof data.dedicatedFlag === 'boolean' &&
        typeof data.mapName === 'string' &&
        (typeof data.mapSeed === 'number') &&
        typeof data.landscape === 'number' &&
        (typeof data.startDate === 'number') &&
        typeof data.mapWidth === 'number' &&
        typeof data.mapHeight === 'number'
    );
}

export async function parseSave(data: any, activeConnection: GameConnection) {
    console.log("Received data", data)
    if (!isSaveData(data)) {
        throw Error("Unexpected data.")
    }
    let saveObjects: Save[] = await db
        .insert(saves)
        .values({...data})
        .onConflictDoUpdate({
            target: saves.serverName,
            set: { ...data },
        })
        .returning()
    console.log(saveObjects)
    let save: Save = saveObjects[0]
    activeConnection.saveId = save.id;
    activeConnection.serverName = save.serverName;
    console.log("Successfully updated or created:", saveObjects, "Set saveId to", save.id)
    return true
}