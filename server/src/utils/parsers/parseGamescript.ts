import { Server } from "socket.io";
import { GSDataTypeFriendlyNames, GameScriptDataType } from "../constants"
import { parseCargo } from "./parseCargo";
import { parseIndustry } from "./parseIndustry";
import { parseIndustryType } from "./parseIndustryType";
import { parseMonthlyStats } from "./parseMonthlyStats";
// import { parseSave } from "./parseSave";
import { parseStation } from "./parseStation";
import { parseTown } from "./parseTown";
import type { GameConnection } from "../connection";
import { parseCargoWaitingAtViaFrom } from "./parseCargoWaitingAtViaFrom";
import { createGSDataPacket } from "../createPackets";
import { MapGSTypeToDateField } from "../../controllers/socketController";
import { saves } from "~shared/db/schema/save";
import { db } from "~shared/db/setup";
import { eq } from "~shared/drizzle-orm";

type GSParserFunction = (data: any, saveId: number) => Promise<boolean | void>;

const GS_PARSERS: Record<GameScriptDataType, GSParserFunction> = {
    [GameScriptDataType.CARGO]: parseCargo,
    [GameScriptDataType.INDUSTRY_TYPE]: parseIndustryType,
    [GameScriptDataType.INDUSTRY]: parseIndustry,
    [GameScriptDataType.TOWN]: parseTown,
    [GameScriptDataType.STATION]: parseStation,
    [GameScriptDataType.COMPANY]: async function (data: any) {
        throw new Error("Function not implemented.");
    },
    [GameScriptDataType.MONTHLY_STATS]: parseMonthlyStats,
    [GameScriptDataType.CARGO_WAITING_STATION_AT_VIA_FROM]: parseCargoWaitingAtViaFrom
}

export const parseGS = async function (data: any, activeConnection: GameConnection): Promise<boolean> {
    if (!('raw_json' in data)) {
        console.log("Failed to find json in GS data.", data)
        return false
    }
    const { saveId, io } = activeConnection
    if (!saveId) {
        console.log(`Failed to receive foreign key to current save game: ${saveId}`)
        return false;
    }
    const { raw_json } = data;
    let json = {}
    try {
        json = JSON.parse(raw_json)
    } catch (error) {
        console.log("Encountered error when parsing to JSON.")
        console.log("JSON:", raw_json)
        console.log("error:", error)
        return false;
    }
    if ('datatype' in json) {
        if ('data' in json) {
            const { datatype, data } = json
            const func = GS_PARSERS[datatype as GameScriptDataType];
            await func(data, saveId);
            return true
        } else if ('end' in json) {
            const datatype = json.datatype as GameScriptDataType;
            switch (datatype) {
                case GameScriptDataType.CARGO:
                    activeConnection.emitNotification('message', { title: 'Logged cargoes', message: 'Finished parsing cargo data from GameScript.', context: 'success' })
                    break;
                case GameScriptDataType.INDUSTRY:
                    activeConnection.emitNotification('message', { title: 'Logged industries', message: 'Finished parsing industry data from GameScript.', context: 'success' })
                    break;
                case GameScriptDataType.INDUSTRY_TYPE:
                    activeConnection.emitNotification('message', { title: 'Logged industry types', message: 'Finished parsing industry types data from GameScript.', context: 'success' })
                    break;
                case GameScriptDataType.TOWN:
                    activeConnection.emitNotification('message', { title: 'Logged towns', message: 'Finished parsing town data from GameScript.', context: 'success' })
                    break;
                case GameScriptDataType.STATION:
                    activeConnection.emitNotification('message', { title: 'Logged stations', message: 'Finished parsing station data from GameScript.', context: 'success'})
                    break;
                case GameScriptDataType.MONTHLY_STATS:
                    activeConnection.emitNotification('message', { title: 'Logged monthly stats', message: 'Finished parsing monthly stats data from GameScript.', context: 'success' })
                    break;
                case GameScriptDataType.CARGO_WAITING_STATION_AT_VIA_FROM:
                    activeConnection.emitNotification('message', { title: 'Logged waiting cargoes', message: 'Finished parsing waiting cargoes data from GameScript.', context: 'success' })
                    break;
            case GameScriptDataType.COMPANY:
                    activeConnection.emitNotification('message', { title: 'Logged companies', message: 'Finished parsing companies data from GameScript.', context: 'success'})
                    break;
                default:
                    activeConnection.emitNotification('message', { title: 'Logged GS data', message: 'Finished parsing GS data from GameScript. Type unknown.', context: 'warning' })
            }
            const nextRequest = activeConnection.queuedRequests.shift();
            if (typeof nextRequest !== 'undefined') {
                const packet = createGSDataPacket({ request: nextRequest });
                const friendlyText = GSDataTypeFriendlyNames[nextRequest];
                activeConnection.emitNotification('message', { title: `Sending request to GameScript for type ${friendlyText}`, message: `Sending update request for update type: ${GSDataTypeFriendlyNames[nextRequest]}`, context: 'info' });
                try {
                    activeConnection.socket!.write(packet);
                } catch (e) {
                    console.log('Error sending packet', e);
                    activeConnection.emitNotification('message', { title: `Failed to send request to GameScript`, message: `Failed to send update request for update type: ${friendlyText}`, context: 'danger' });
                    throw e;
                }
                const newData = { [MapGSTypeToDateField[nextRequest]]: new Date() }
                await db.update(saves).set(newData).where(eq(saves.id, activeConnection.saveId));
            }
        }
    } else {
        console.log("Failed to find GS data keys in GS data.", json)
        return false
    }
}