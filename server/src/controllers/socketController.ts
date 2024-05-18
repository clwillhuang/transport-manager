import { NextFunction, Request, Response } from "express";
import { createGSDataPacket, createCompanyPollPacket, createUpdatePacket, PollableAdminCompanyUpdateType } from "../utils/createPackets";
import { AdminUpdateFrequency, AdminUpdateType, GSDataTypeFriendlyNames, GameScriptDataType, PacketType } from "../utils/constants";
import { activeConnection } from "../server";
import { companies } from "~shared/db/schema/company";
import { db } from "~shared/db/setup";
import { and, eq } from "~shared/drizzle-orm";
import { Save, saves } from "~shared/db/schema/save";

export const MapGSTypeToDateField: Record<GameScriptDataType, keyof Save> = {
    [GameScriptDataType.COMPANY]: 'timeFetchedCompanies',
    [GameScriptDataType.CARGO]: 'timeFetchedCargos',
    [GameScriptDataType.TOWN]: 'timeFetchedTowns',
    [GameScriptDataType.INDUSTRY_TYPE]: 'timeFetchedIndustryTypes',
    [GameScriptDataType.INDUSTRY]: 'timeFetchedIndustries',
    [GameScriptDataType.STATION]: 'timeFetchedStations',
    [GameScriptDataType.MONTHLY_STATS]: 'timeFetchedMonthlyStats',
    [GameScriptDataType.CARGO_WAITING_STATION_AT_VIA_FROM]: 'timeFetchedCargoWaiting'
}

export async function requestUpdateAll(req: Request, res: Response, next: NextFunction) {
    req.activeConnection.queuedRequests = [GameScriptDataType.CARGO, GameScriptDataType.TOWN, GameScriptDataType.INDUSTRY_TYPE, GameScriptDataType.INDUSTRY, GameScriptDataType.STATION, GameScriptDataType.MONTHLY_STATS, GameScriptDataType.CARGO_WAITING_STATION_AT_VIA_FROM];

    // let company = await db.query.companies.findFirst({
    //     where: and(eq(companies.saveId, req.activeConnection.saveId), eq(companies.isAI, false)),
    // });
    // if (!company) {
    //     req.activeConnection.emitNotification('message', { title: `GameScript Data Request Failed`, message: `Failed to send request to GameScript because failed to identify player company.`, context: 'danger' });
    //     return res.json({ 'success': false, queue: req.activeConnection.queuedRequests })
    // }
    let data = { request: GameScriptDataType.CARGO };
    const packet = createGSDataPacket(data);

    console.log('Sending created packet', packet);
    const friendlyText = GSDataTypeFriendlyNames[data.request];
    try {
        activeConnection.socket!.write(packet);
    } catch (e) {
        console.log('Error sending packet', e);
        activeConnection.emitNotification('message', { title: `Failed to send request to GameScript`, message: `Failed to send update request for update type: ${friendlyText}`, context: 'danger' });
        activeConnection.queuedRequests = []
        res.json({ 'success': false, queue: req.activeConnection.queuedRequests })
    }
    activeConnection.emitNotification('message', { title: `Sent request to GameScript`, message: `Sent update request for update type: ${friendlyText}`, context: 'success' });

    res.json({ 'success': true, queue: req.activeConnection.queuedRequests })
}

export async function cancelRequestAll(req: Request, res: Response, next: NextFunction) {
    req.activeConnection.queuedRequests = [];
    res.json({ 'success': true })
}

// Create a handler that sends a packet polling our gamescript to request a certain type of data
export function requestDataFactory(gsDataType: GameScriptDataType) {
    const func = async (req: Request, res: Response, next: NextFunction) => {
        let data = { request: gsDataType }
        const packet = createGSDataPacket(data);

        console.log('Sending created packet', packet);
        const friendlyText = GSDataTypeFriendlyNames[gsDataType];
        try {
            activeConnection.socket!.write(packet);
        } catch (e) {
            console.log('Error sending packet', e);
            activeConnection.emitNotification('message', { title: `Failed to send request to GameScript`, message: `Failed to send update request for update type: ${friendlyText}`, context: 'danger' });
            throw e;
        }
        activeConnection.emitNotification('message', { title: `Sent request to GameScript`, message: `Sent update request for update type: ${friendlyText}`, context: 'success' });

        let newData = {}

        switch (gsDataType) {
            case GameScriptDataType.CARGO:
                newData = { timeFetchedCargos: new Date() };
                break;
            case GameScriptDataType.INDUSTRY_TYPE:
                newData = { timeFetchedIndustryTypes: new Date() };
                break;
            case GameScriptDataType.INDUSTRY:
                newData = { timeFetchedIndustries: new Date() };
                break;
            case GameScriptDataType.TOWN:
                newData = { timeFetchedTowns: new Date() };
                break;
            case GameScriptDataType.STATION:
                newData = { timeFetchedStations: new Date() };
                break;
            case GameScriptDataType.MONTHLY_STATS:
                newData = { timeFetchedMonthlyStats: new Date() };
                break;
            case GameScriptDataType.COMPANY:
                newData = { timeFetchedCompanies: new Date() };
                break;
            case GameScriptDataType.CARGO_WAITING_STATION_AT_VIA_FROM:
                newData = { timeFetchedCargoWaiting: new Date() };
                break;
            default:
                console.log('Unknown data type', gsDataType)
        }
        await db.update(saves).set(newData).where(eq(saves.id, req.activeConnection.saveId));
        res.json({ 'success': true, 'data': data })
    }
    return func;
}

// export function asyncRequestDataFactory(gsDataType: GameScriptDataType) {
//     // upon request, create a new socket connection that sends data to the game client.
//     // the socket will keep feeding data to the client until the connection is closed
//     const func = async (clientSocket: Socket) => {
//         clientSocket.on('request', (msg) => {
//             console.log('Request: ' + msg);
//             const gameSocket = createConnection(async (data) => {
//                 const gsPackets = data.filter(packet => packet.packetType === PacketType.ADMIN_PACKET_SERVER_GAMESCRIPT)
//                 // check if any of the packets has data_type === gsDataType and message === 'end'. If so, end
//                 for (let i = 0; i < gsPackets.length; i++) {
//                     const packet = gsPackets[i]
//                     if (typeof packet.data.data_type === 'number' &&
//                         packet.data.data_type === gsDataType &&
//                         typeof packet.data.message === 'string' &&
//                         packet.data.message === 'end') {

//                         gameSocket.end();
//                     }
//                 }
//             })
//             gameSocket.on('close', () => {
//                 clientSocket.emit('close', { success: true })
//                 clientSocket.destroy();
//                 gameSocket.destroy();
//             })
//             gameSocket.write(createGSDataPacket({ request: gsDataType }))
//             gameSocket.on('connection', () => {

//             })
//         });
//         clientSocket.on('error', (err) => {
//             console.log('Error: ' + err);
//             clientSocket.emit('close', { success: false });
//             clientSocket.destroy();
//         })
//     }
//     return func;
// }

// Create a handler that sends a packet polling the game to send an admin event
export function requestAdminPollFactory(pollPacketType: PollableAdminCompanyUpdateType) {
    const func = async (req: Request, res: Response, next: NextFunction) => {
        const companyId = await db.query.companies.findFirst({
            where: eq(companies.saveId, req.activeConnection.saveId)
        })
        const packet = createCompanyPollPacket(pollPacketType, companyId.companyId)
        console.log('Sending packet', packet)
        activeConnection.socket!.write(packet);
        console.log('Sent packet.')
        res.json({ 'success': true, 'poll': pollPacketType, 'companyId': companyId.companyId })
    }
    return func;
}

interface POSTServerQuery {
    UpdateType: number,
    UpdateFrequency: number
}

interface POSTServerPoll {
    UpdateType: number,
    UpdateFrequency: number,
    UpdateID: number
}

export const getFrequency = async (req: Request, res: Response, next: NextFunction) => {
    let info: POSTServerPoll = req.body
    console.log("Poll", info.UpdateType, info.UpdateID)
    if (info.UpdateFrequency == 1) {
        req.activeConnection.socket!.write(createCompanyPollPacket(info.UpdateType, info.UpdateID))
    } else {
        res.status(400).json({ message: "Wrong frequency." })
    }
    res.status(200).json({ message: `Polling ${info.UpdateType}, ${info.UpdateFrequency}` })
}

export const updateFrequency = async (req: Request, res: Response) => {
    let info: POSTServerQuery = req.body
    console.log("Query", info.UpdateType, info.UpdateFrequency)
    if (info.UpdateFrequency == 1) {
        console.log("Wrong Freq")
    } else {
        req.activeConnection.socket!.write(createUpdatePacket(info.UpdateType, info.UpdateFrequency))
    }
    res.status(200).send(`Query,${info.UpdateType}, ${info.UpdateFrequency}`)
}

/**
 * Endpoint to register the Admin Port to poll the GameScript automatically.
 * 
 * Sends a packet to the GameScript to request new data.
 * 
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The Express next function.
 */
export const pollGS = async (req: Request, res: Response, next: NextFunction) => {
    // The information to send to the GameScript.
    let info: POSTServerQuery = {
        UpdateFrequency: AdminUpdateFrequency.Automatic, // The frequency to poll.
        UpdateType: AdminUpdateType.GameScript // The type of data to request.
    }

    // Check if the frequency is correct, if not, log a message.
    if (info.UpdateFrequency == 1) {
        console.log("Wrong Freq")
    }
    // If the frequency is correct, send a packet to the GameScript.
    else {
        req.activeConnection.socket!.write(createUpdatePacket(info.UpdateType, info.UpdateFrequency))
    }

    // Send a response to the client.
    res.status(200).send(`Query,${info.UpdateType}, ${info.UpdateFrequency}`)
}
