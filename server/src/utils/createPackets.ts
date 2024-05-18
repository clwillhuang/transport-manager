import { AdminUpdateFrequency, AdminUpdateType, PacketType } from "./constants"

//--FUNCTIONS--
export function createAdminJoin(Password:string, BotName:string, Version:string) {
    //SIZE  SIZE 0x00 BotName 0x00 Password 0x00  Version 0x00
    let Variables:Array<string> = [Password, BotName, Version]
    let Packet:Buffer = Buffer.from(new Uint8Array([0x00, 0x00, 0x00]))
    Variables.forEach((str:string) => {
        Packet = Buffer.concat([Packet, Buffer.from(str), new Uint8Array([0x00])])
    })
    Packet[0] = Packet.length
    return Packet
}

// All pollable update types 
// https://github.com/OpenTTD/OpenTTD/blob/master/docs/admin_network.md#31-polling-manually
export type PollableUpdateType = AdminUpdateType.Date | AdminUpdateType.ClientInfo | AdminUpdateType.CMDNames | PollableAdminCompanyUpdateType

// All update types that to send to the admin poll which require a uint8 for company ID
export type PollableAdminCompanyUpdateType = AdminUpdateType.CompanyInfo | AdminUpdateType.CompanyStats | AdminUpdateType.CompanyEcon

// Do a one time poll for the admin port
export function createCompanyPollPacket(adminUpdateType: PollableAdminCompanyUpdateType,
    companyId: number): Buffer {
    // Packet as described in NetworkAdminSocketHandler::Receive_ADMIN_POLL	
    // packet size (2) + packet type (1) + poll type (1) + companyId (uint32 = 4) 
    let bufferSize = 2 + 1 + 1 + 4
    let packet: Buffer = Buffer.alloc(bufferSize)
    packet.writeUint16LE(bufferSize, 0);
    packet.writeUint8(PacketType.ADMIN_PACKET_ADMIN_POLL, 2);
    packet.writeUInt8(adminUpdateType, 3);
    packet.writeUint32LE(companyId, 4);
    return(packet)
} 

export function createClientInfoPacket(clientId: number) {
    // Packet as described in NetworkAdminSocketHandler::Receive_ADMIN_POLL	
    // packet size (2) + packet type (1) + poll type (1) + clientId (uint32 = 4) 
    // set clientId to UINT32_MAX for all clients
    let bufferSize = 2 + 1 + 1 + 4
    let packet: Buffer = Buffer.alloc(bufferSize)
    // size of buffer, minus the type
    packet.writeUint16LE(bufferSize, 0);
    packet.writeUint8(PacketType.ADMIN_PACKET_ADMIN_POLL, 2);
    packet.writeUInt8(AdminUpdateType.ClientInfo, 3);
    packet.writeUint32LE(clientId, 4);
    return(packet)
}

// Send a packet to update how often the UpdateType is given
export function createUpdatePacket(UpdateType: AdminUpdateType,UpdateFrequency: AdminUpdateFrequency): Buffer {
    let Packet:Buffer
    //certain updates can only have certain values
    //do we want to return failures if you choose an invalid value?
    Packet = Buffer.from([0x07, 0x00, 0x02, UpdateType, 0x00, UpdateFrequency, 0x00])
    console.log(Packet,"UPDATE PACKET")
    return(Packet)
} 

export function createGSDataPacket(data: object): Buffer {
    const json = JSON.stringify(data);
    const packetSize = Buffer.byteLength(json) + 1 + 2 + 1;
    console.log(`Packet length is `, Buffer.byteLength(json), '+ 1 + 2 + 1 =', packetSize)
    const packet = Buffer.alloc(packetSize) // allocate for terminator
    packet.writeUInt16LE(packetSize, 0);
    packet.writeUint8(PacketType.ADMIN_PACKET_ADMIN_GAMESCRIPT, 2); // type
    packet.write(json, 3);
    return packet;
}
