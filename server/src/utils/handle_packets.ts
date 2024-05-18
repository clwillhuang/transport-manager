//https://github.com/OpenTTD/OpenTTD/blob/master/src/network/core/tcp_admin.h

import { GameConnection } from "./connection"
import { AdminUpdateType, PacketType } from "./constants"
import { createClientInfoPacket, createCompanyPollPacket } from "./createPackets"
import { isAdminClientInfoData } from "./packetParsers/parseAdminClientInfo"
import { parseAdminCompanyInfo } from "./packetParsers/parseAdminCompanyInfo"
import { parseAdminCompanyStats } from "./packetParsers/parseAdminCompanyStats"
import { PacketDataMap, PacketData, PacketDataType, PacketProperty } from "./packet_types"
import { parseGS } from "./parsers/parseGamescript"
import { parseSave } from "./parsers/parseSave"
import { ExtractUINT8, ExtractBOOL, ExtractUINT16, ExtractSTRING, ExtractUINT32, ExtractUINT64, ExtractINT64, ReadFunction, ReadFunctionResult, ExtractMoney as ExtractMONEY, ExtractFlag as ExtractFLAG } from "./read"

const READ_FUNCTIONS: Record<PacketDataType, ReadFunction<any>> = {
    [PacketDataType.BOOL]: ExtractBOOL,
    [PacketDataType.UINT8]: ExtractUINT8,
    [PacketDataType.UINT16]: ExtractUINT16,
    [PacketDataType.UINT32]: ExtractUINT32,
    [PacketDataType.UINT64]: ExtractUINT64,
    [PacketDataType.INT64]: ExtractINT64,
    [PacketDataType.STRING]: ExtractSTRING,
    [PacketDataType.FLAG]: ExtractFLAG,
    [PacketDataType.CHAT_MONEY]: ExtractMONEY,
}

export function parseBuffer(inputData: Buffer, packetType: PacketType) {
    let datatypes: PacketData = PacketDataMap[packetType]
    if (typeof datatypes === 'undefined' || datatypes === null) {
        console.log(`Packet parsing for ${packetType} not implemented.`)
        return {}
    }
    let obj: object = {}
    datatypes.forEach((prop: PacketProperty) => {
        let keyType = Array.isArray(prop.type) ? PacketDataType.FLAG : prop.type
        let { data, nextBuffer } = READ_FUNCTIONS[keyType](inputData, obj)
        inputData = nextBuffer
        obj[prop.key] = data
    })
    console.log("Parsed objects to buffer", obj)
    return obj;
}

export async function processPacket(rawBuffer: Buffer, activeConnection: GameConnection): Promise<{data: Object, packetType: PacketType}[]> {
    let totalRawLength: number = rawBuffer.length
    let lengthProcessed: number = 0
    let currentType: PacketType
    let currentPacket: Buffer
    let dataRead: {data: Object, packetType: PacketType}[] = []
    console.log('Packet of total length', rawBuffer.length, 'received.')
    while (lengthProcessed < totalRawLength) {
        currentType = rawBuffer[lengthProcessed + 2] as PacketType
        let sizePortion = rawBuffer.subarray(lengthProcessed, lengthProcessed + 2)
        let currentPacketLength = sizePortion.readUint16LE()
        console.log('Processing packet type', currentType, "of length", currentPacketLength);
        currentPacket = rawBuffer.subarray(lengthProcessed, lengthProcessed + currentPacketLength)
        dataRead.push({
            data: await processType(currentType, currentPacket.subarray(3, currentPacket.length), activeConnection),
            packetType: currentType
        })
        lengthProcessed = lengthProcessed + currentPacketLength
        console.log("Finished processing type", currentType, "Total lengths:", lengthProcessed, "/", totalRawLength)
    }
    console.log("Finished processing packets.")
    return dataRead;
}


export async function processType(Type: PacketType, buffer: Buffer, activeConnection: GameConnection): Promise<object> {
    let data = parseBuffer(buffer, Type)
    switch (Type) {
        case PacketType.ADMIN_PACKET_ADMIN_JOIN:
            console.log(buffer, "ADMIN_JOIN")
            break
        case PacketType.ADMIN_PACKET_ADMIN_QUIT:
            console.log(buffer, "ADMIN_QUIT")
            break
        case PacketType.ADMIN_PACKET_ADMIN_UPDATE_FREQUENCY:
            console.log(buffer, "ADMIN_UPDATE_FREQUENCY")
            break
        case PacketType.ADMIN_PACKET_ADMIN_POLL:
            console.log(buffer, "ADMIN_POLL")
            break
        case PacketType.ADMIN_PACKET_ADMIN_CHAT:
            console.log(buffer, "ADMIN_CHAT")
            break
        case PacketType.ADMIN_PACKET_ADMIN_RCON:
            console.log(buffer, "ADMIN_RCON")
            break
        case PacketType.ADMIN_PACKET_ADMIN_GAMESCRIPT:
            console.log(buffer, "ADMIN_GAMESCRIPT")
            break
        case PacketType.ADMIN_PACKET_ADMIN_PING:
            console.log(buffer, "ADMIN_PING")
            break
        case PacketType.ADMIN_PACKET_ADMIN_EXTERNAL_CHAT:
            console.log(buffer, "ADMIN_EXTERNAL_CHAT")
            break
        //----------------------------------------
        //          ABOVE IS WHAT WE CAN SEND
        //          BELOW  WE RECEIVE
        //----------------------------------------
        case PacketType.ADMIN_PACKET_SERVER_FULL:
            console.log("SERVER Full")
            break
        case PacketType.ADMIN_PACKET_SERVER_BANNED:
            console.log("SERVER Banned")
            break
        case PacketType.ADMIN_PACKET_SERVER_ERROR:
            console.log("SERVER Error")
            break
        case PacketType.ADMIN_PACKET_SERVER_PROTOCOL:
            console.log("SERVER Protocol")
            break
        case PacketType.ADMIN_PACKET_SERVER_WELCOME:
            console.log("SERVER Welcome")
            await parseSave(data, activeConnection)
            activeConnection.emitNotification('message', { 
                title: 'Connection Successful', 
                message: `Successfully connected to your currently running OpenTTD game over the Admin Port. Save ID: ${activeConnection.saveId}, Server Name: ${activeConnection.serverName}`,
                context: 'success'
            })
            // Once connected, ask for client data
            const clientPacket = createClientInfoPacket(4294967295)
            activeConnection.socket.write(clientPacket)
            // activeConnection.socket!.write(Buffer.from(new Uint8Array([0x00])))
            // console.log("Sending", clientPacket)
            console.log("SENDING COMPANY INFO POLL PACKET")
            // we know a company id, so send a request to get company info
            // activeConnection.socket!.write(createClientInfoPacket(4294967295))
            console.log(activeConnection.socket.write(createCompanyPollPacket(AdminUpdateType.CompanyInfo, 0)))
            break
        case PacketType.ADMIN_PACKET_SERVER_NEWGAME:
            console.log("SERVER New Game")
            break
        case PacketType.ADMIN_PACKET_SERVER_SHUTDOWN:
            console.log("SERVER Shutdown")
            break
        case PacketType.ADMIN_PACKET_SERVER_DATE:
            console.log("SERVER Date")
            break
        case PacketType.ADMIN_PACKET_SERVER_CLIENT_JOIN:
            console.log(data, "CLIENT Join")
            //ServerObj.Clients.push(NewClient)
            break
        case PacketType.ADMIN_PACKET_SERVER_CLIENT_INFO:
            console.log("CLIENT Info")
            // verify data
            if (!isAdminClientInfoData(data)) {
                console.log("Unexpected data", data)
                break
            }
            console.log("SENDING COMPANY INFO POLL PACKET")
            // we know a company id, so send a request to get company info
            // activeConnection.socket!.write(createClientInfoPacket(4294967295))
            console.log(activeConnection.socket!.write(createCompanyPollPacket(AdminUpdateType.CompanyInfo, 0)))
            break
        case PacketType.ADMIN_PACKET_SERVER_CLIENT_UPDATE:
            console.log("CLIENT Update")
            break
        case PacketType.ADMIN_PACKET_SERVER_CLIENT_QUIT:
            break
        case PacketType.ADMIN_PACKET_SERVER_CLIENT_ERROR:
            console.log("CLIENT Error")
            console.log("Client ID:", data[0])
            console.log("Error Code:", data[1])
            break
        case PacketType.ADMIN_PACKET_SERVER_COMPANY_NEW:
            console.log(data, "New Company Created!")
            break
        case PacketType.ADMIN_PACKET_SERVER_COMPANY_INFO:
            console.log("COMPANY Info")
            await parseAdminCompanyInfo(data, activeConnection.saveId);
            break
        case PacketType.ADMIN_PACKET_SERVER_COMPANY_UPDATE:
            console.log("COMPANY Update")
            break
        case PacketType.ADMIN_PACKET_SERVER_COMPANY_REMOVE:
            console.log("COMPANY Remove")
            break
        case PacketType.ADMIN_PACKET_SERVER_COMPANY_ECONOMY:
            console.log("COMPANY Economy")
            break
        case PacketType.ADMIN_PACKET_SERVER_COMPANY_STATS:
            console.log("COMPANY")
            parseAdminCompanyStats(data, activeConnection.saveId);
            break
        case PacketType.ADMIN_PACKET_SERVER_CHAT:
        case PacketType.ADMIN_PACKET_SERVER_RCON:
        case PacketType.ADMIN_PACKET_SERVER_CONSOLE:
        case PacketType.ADMIN_PACKET_SERVER_CMD_NAMES:
        case PacketType.ADMIN_PACKET_SERVER_CMD_LOGGING_OLD:
            break
        case PacketType.ADMIN_PACKET_SERVER_GAMESCRIPT:
            const result = await parseGS(data, activeConnection)
            console.log("Parsed gamescript data. Result: ", result)
        case PacketType.ADMIN_PACKET_SERVER_RCON_END:
        case PacketType.ADMIN_PACKET_SERVER_PONG:
        case PacketType.ADMIN_PACKET_SERVER_CMD_LOGGING:
            break
        default:
            throw Error(`The Packet TYpe ${Type} is not yet accounted for`)
    }
    return data;
}


