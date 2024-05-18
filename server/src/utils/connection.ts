import { AdminUpdateFrequency, AdminUpdateType, GameScriptDataType, PacketType } from './constants'
import { processPacket } from './handle_packets';
import { createAdminJoin, createUpdatePacket } from './createPackets';
import { Socket } from 'net';
import { get } from 'http'
import * as dotenv from 'dotenv';
dotenv.config();

import { Server } from "socket.io";

export type NotificationEmitter = (event: string, data: { title: string; message: string; context?: "success" | "primary" | "secondary" | "danger" | "warning" | "info" | "light" | "dark"; }) => void;

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
    socket.connect(PORT, HOST, function () {
        socket.write(createAdminJoin(PASS, NAME, VERSION));
        console.log('CONNECTED TO: ' + HOST + ':' + PORT);
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
            activeConnection.emitNotification('message', { 
                title: "Connection Failure", 
                message: "Encountered an error while connected to your OpenTTD game.",
                context: 'danger'
            })
        } else {
            console.log(activeConnection)
            activeConnection.emitNotification('message', { 
                title: "Connection Unsuccessful", 
                message: `Encountered an error while trying to connect to your OpenTTD game at Host ${HOST}, Port ${PORT}.`,
                context: 'danger'
            })
        }
        activeConnection.queuedRequests = [];
        activeConnection.saveId = null;
        activeConnection.serverName = null;
        get(`http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/socket/error`)
        return ([null, null])
    })
    // Add a 'close' event handler for the client socket
    socket.on('close', function () {
        if (activeConnection.saveId) {
            activeConnection.emitNotification('message', { 
                title: "Connection Closed", 
                message: "Disconnected from your OpenTTD game.",
                context: 'danger'
            })
        }
        activeConnection.queuedRequests = [];
        activeConnection.saveId = null;
        activeConnection.serverName = null;
    });
    return socket
}


