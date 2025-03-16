import { AdminUpdateFrequency, AdminUpdateType, GameScriptDataType, PacketType } from './constants'
import { processPacket } from './notification/handle_packets';
import { createAdminJoin, createUpdatePacket } from './packetCreators/createPackets';
import { Socket } from 'net';
import { get } from 'http'
import * as dotenv from 'dotenv';
dotenv.config();

import { Server } from "socket.io";
import { MessageNotificationContext, NotificationConnectionStatus, NotificationEmitter, emitNotificationConnection } from './NotificationEmitter';

export type GameConnection = {
    socket: Socket | null,
    serverName: string | null,
    saveId: number | null,
    io: Server,
    emitNotification: NotificationEmitter,
    queuedRequests: GameScriptDataType[],
}

type DataProcessor = (data: Array<{
    data: any;
    packetType: PacketType;
}>) => Promise<void>;

export function createConnection(io, activeConnection: GameConnection, processData?: DataProcessor): Socket {
    let socket = new Socket();
    const HOST: string = process.env.OPENTTD_SERVER_IP as string
    const PORT: number = parseInt(process.env.OPENTTD_SERVER_ADMIN_PORT as string, 10)
    const PASS: string = process.env.OPENTTD_ADMIN_PASSWORD as string
    const NAME: string = process.env.BOT_NAME as string
    const VERSION: string = process.env.VERSION as string
    activeConnection.saveId = null;
    activeConnection.serverName = null;
    activeConnection.queuedRequests = [];
    // Connect to the open and active OpenTTD Server
    console.log("Initiating connection to " + HOST + ":" + PORT);
    socket.connect(PORT, HOST, function () {
        console.log('CONNECTED TO: ' + HOST + ':' + PORT);
        emitNotificationConnection(io, NotificationConnectionStatus.CONNECTED, activeConnection.saveId);
        socket.write(createAdminJoin(PASS, NAME, VERSION));
        socket.write(createUpdatePacket(AdminUpdateType.GameScript, AdminUpdateFrequency.Automatic))
    });
    socket.on('data', async (data) => {
        console.log("Received data over socket.");
        const any = await processPacket(data, activeConnection)
        if (processData) {
            await processData(any);
        }
        any.forEach(packet => {io.emit('game_data', {data: packet.data, packetType: packet.packetType})})
    });
    socket.on('error', (err) => {
        console.log('errored: ', err.message, err.name)
        if (activeConnection.saveId) {
            emitNotificationConnection(activeConnection.io, NotificationConnectionStatus.INTERRUPTED, activeConnection.saveId);
            // TODO: Disconnect?
        } else {
            emitNotificationConnection(activeConnection.io, NotificationConnectionStatus.CONNECTION_UNSUCCESSFUL, null);
        }
        activeConnection.queuedRequests = [];
        activeConnection.saveId = null;
        activeConnection.serverName = null;
    })
    // Add a 'close' event handler for the client socket
    socket.on('close', function () {
        console.log('Connection closed');
        activeConnection.queuedRequests = [];
        activeConnection.saveId = null;
        activeConnection.serverName = null;
    });
    return socket
}


