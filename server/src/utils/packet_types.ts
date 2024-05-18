import { PacketType } from "./constants"

export enum PacketDataType {
    BOOL = "BOOL",
    UINT8 = "UINT8",
    UINT16 = "UINT16",
    UINT32 = "UINT32",
    UINT64 = "UINT64",
    INT64 = "INT64",
    STRING = "STRING",
    FLAG = "FLAG",
    CHAT_MONEY = "CHAT_MONEY"
}
type NestedData = Array<{key: string, type: PacketDataType}>
export type PacketProperty = {
    key: string;
    type: PacketDataType | NestedData;
};

type PacketDataArray = Array<PacketProperty>;
export type PacketData = PacketDataArray | undefined | null;

// https://docs.openttd.org/source/da/d9e/classNetworkAdminSocketHandler
export const PacketDataMap: Record<PacketType, PacketData> = {
    // sent to server
    [PacketType.ADMIN_PACKET_SERVER_FULL]: null,
    [PacketType.ADMIN_PACKET_ADMIN_JOIN]: undefined,
    [PacketType.ADMIN_PACKET_ADMIN_QUIT]: undefined,
    [PacketType.ADMIN_PACKET_ADMIN_UPDATE_FREQUENCY]: undefined,
    [PacketType.ADMIN_PACKET_ADMIN_POLL]: undefined,
    [PacketType.ADMIN_PACKET_ADMIN_CHAT]: undefined,
    [PacketType.ADMIN_PACKET_ADMIN_RCON]: undefined,
    [PacketType.ADMIN_PACKET_ADMIN_GAMESCRIPT]: undefined,
    [PacketType.ADMIN_PACKET_ADMIN_PING]: undefined,
    [PacketType.ADMIN_PACKET_ADMIN_EXTERNAL_CHAT]: undefined,
    // received from server
    [PacketType.ADMIN_PACKET_SERVER_BANNED]: null,
    [PacketType.ADMIN_PACKET_SERVER_ERROR]: [
        { key: 'errorCode', type: PacketDataType.UINT8 }
    ],
    [PacketType.ADMIN_PACKET_SERVER_PROTOCOL]: [
        { key: 'version', type: PacketDataType.UINT8 },
        { key: 'further', type: PacketDataType.BOOL },
        { key: 'more', type: [
            { key: 'updateType', type: PacketDataType.UINT16 },
            { key: 'frequencyType', type: PacketDataType.UINT16 },
            { key: 'further', type: PacketDataType.BOOL }
        ]}
    ],
    [PacketType.ADMIN_PACKET_SERVER_WELCOME]: [
        { key: 'serverName', type: PacketDataType.STRING },
        { key: 'gameVersion', type: PacketDataType.STRING },
        { key: 'dedicatedFlag', type: PacketDataType.BOOL },
        { key: 'mapName', type: PacketDataType.STRING },
        { key: 'mapSeed', type: PacketDataType.UINT32 },
        { key: 'landscape', type: PacketDataType.UINT8 },
        { key: 'startDate', type: PacketDataType.UINT32 },
        { key: 'mapWidth', type: PacketDataType.UINT16 },
        { key: 'mapHeight', type: PacketDataType.UINT16 },
    ],
    [PacketType.ADMIN_PACKET_SERVER_NEWGAME]: null,
    [PacketType.ADMIN_PACKET_SERVER_SHUTDOWN]: null,
    [PacketType.ADMIN_PACKET_SERVER_DATE]: [
        { key: 'date', type: PacketDataType.UINT32 },
    ],
    [PacketType.ADMIN_PACKET_SERVER_CLIENT_JOIN]: [
        { key: 'clientId', type: PacketDataType.UINT32 },
    ],
    [PacketType.ADMIN_PACKET_SERVER_CLIENT_INFO]: [
        { key: 'clientId', type: PacketDataType.UINT32 },
        { key: 'networkAddress', type: PacketDataType.STRING },
        { key: 'name', type: PacketDataType.STRING },
        { key: 'lang', type: PacketDataType.UINT8 },
        { key: 'date', type: PacketDataType.UINT32 },
        { key: 'companyId', type: PacketDataType.UINT8 }
    ],
    [PacketType.ADMIN_PACKET_SERVER_CLIENT_UPDATE]: [
        { key: 'clientId', type: PacketDataType.UINT32 },
        { key: 'name', type: PacketDataType.STRING },
        { key: 'companyId', type: PacketDataType.UINT8 }
    ],
    [PacketType.ADMIN_PACKET_SERVER_CLIENT_QUIT]: [
        { key: 'clientId', type: PacketDataType.UINT32 },
    ],
    [PacketType.ADMIN_PACKET_SERVER_CLIENT_ERROR]: [
        { key: 'clientId', type: PacketDataType.UINT32 },
        { key: 'error', type: PacketDataType.UINT8 }
    ],
    [PacketType.ADMIN_PACKET_SERVER_COMPANY_NEW]: [
        { key: 'clientId', type: PacketDataType.UINT8 },
    ],
    [PacketType.ADMIN_PACKET_SERVER_COMPANY_INFO]: [
        { key: 'companyId', type: PacketDataType.UINT8 },
        { key: 'name', type: PacketDataType.STRING },
        { key: 'managerName', type: PacketDataType.STRING },
        { key: 'color', type: PacketDataType.UINT8 },
        { key: 'password', type: PacketDataType.BOOL },
        { key: 'startDate', type: PacketDataType.UINT32 },
        { key: 'isAI', type: PacketDataType.BOOL }
    ],
    [PacketType.ADMIN_PACKET_SERVER_COMPANY_UPDATE]: [
        { key: 'companyId', type: PacketDataType.UINT8 },
        { key: 'name', type: PacketDataType.STRING },
        { key: 'managerName', type: PacketDataType.STRING },
        { key: 'color', type: PacketDataType.UINT8 },
        { key: 'quartersOfBankruptcy', type: PacketDataType.UINT8 },
        { key: 'password', type: PacketDataType.BOOL },
        { key: 'share1', type: PacketDataType.UINT8 },
        { key: 'share2', type: PacketDataType.UINT8 },
        { key: 'share3', type: PacketDataType.UINT8 },
        { key: 'share4', type: PacketDataType.UINT8 },
    ],
    [PacketType.ADMIN_PACKET_SERVER_COMPANY_REMOVE]: [
        { key: 'companyId', type: PacketDataType.UINT8 },
        { key: 'reason', type: PacketDataType.UINT8 },
    ],
    [PacketType.ADMIN_PACKET_SERVER_COMPANY_ECONOMY]: [
        { key: 'companyId', type: PacketDataType.UINT8 },
        { key: 'money', type: PacketDataType.UINT64 },
        { key: 'loan', type: PacketDataType.UINT64 },
        { key: 'income', type: PacketDataType.INT64 },
        { key: 'thisQuarterDelivered', type: PacketDataType.UINT16 },
        { key: 'lastQuarterValue', type: PacketDataType.UINT64 },
        { key: 'lastQuarterPerformance', type: PacketDataType.UINT16 },
        { key: 'lastQuarterDelivered', type: PacketDataType.UINT16 },
        { key: 'prevQuarterValue', type: PacketDataType.UINT64 },
        { key: 'prevQuarterPerformance', type: PacketDataType.UINT16 },
        { key: 'prevQuarterDelivered', type: PacketDataType.UINT16 },
    ],
    [PacketType.ADMIN_PACKET_SERVER_COMPANY_STATS]: [
        { key: 'companyId', type: PacketDataType.UINT8 },
        { key: 'trains', type: PacketDataType.UINT16 },
        { key: 'lorries', type: PacketDataType.UINT16 },
        { key: 'buses', type: PacketDataType.UINT16 },
        { key: 'planes', type: PacketDataType.UINT16 },
        { key: 'ships', type: PacketDataType.UINT16 },
        { key: 'trainStations', type: PacketDataType.UINT16 },
        { key: 'lorryStations', type: PacketDataType.UINT16 },
        { key: 'busStations', type: PacketDataType.UINT16 },
        { key: 'airports', type: PacketDataType.UINT16 },
        { key: 'harbors', type: PacketDataType.UINT16 },
    ],
    [PacketType.ADMIN_PACKET_SERVER_CHAT]: [
        { key: 'action', type: PacketDataType.UINT8 },
        { key: 'destination', type: PacketDataType.UINT8 },
        { key: 'clientId', type: PacketDataType.UINT32 },
        { key: 'message', type: PacketDataType.STRING },
        { key: 'giveMoney', type: PacketDataType.CHAT_MONEY }, // uint64_t
    ],
    [PacketType.ADMIN_PACKET_SERVER_RCON]: [
        { key: 'color', type: PacketDataType.UINT16 },
        { key: 'output', type: PacketDataType.STRING },
    ],
    [PacketType.ADMIN_PACKET_SERVER_CONSOLE]: [
        { key: 'origin', type: PacketDataType.STRING },
        { key: 'text', type: PacketDataType.STRING }
    ],
    [PacketType.ADMIN_PACKET_SERVER_CMD_NAMES]: [
        { key: 'further', type: PacketDataType.BOOL },
        { key: 'more', type: [
            { key: 'id', type: PacketDataType.UINT16 },
            { key: 'name', type: PacketDataType.STRING },
            { key: 'further', type: PacketDataType.BOOL }
        ]}
    ],
    [PacketType.ADMIN_PACKET_SERVER_CMD_LOGGING_OLD]: [
        { key: 'data', type: PacketDataType.STRING }
    ],
    [PacketType.ADMIN_PACKET_SERVER_GAMESCRIPT]: [
        { key: 'raw_json', type: PacketDataType.STRING }
    ],
    [PacketType.ADMIN_PACKET_SERVER_RCON_END]: [
        { key: 'command', type: PacketDataType.STRING }
    ],
    [PacketType.ADMIN_PACKET_SERVER_PONG]: [
        { key: 'id', type: PacketDataType.UINT32 }
    ],
    // NOTICE: Data provided with this packet is not stable 
    // and will not be treated as such. Do not rely on 
    // IDs or names to be constant across different versions 
    // / revisions of OpenTTD. Data provided in this packet is for 
    // logging purposes only.
    [PacketType.ADMIN_PACKET_SERVER_CMD_LOGGING]: [
        { key: 'clientId', type: PacketDataType.UINT32 },
        { key: 'companyId', type: PacketDataType.UINT8 },
        { key: 'commandId', type: PacketDataType.UINT16 },
        { key: 'p1', type: PacketDataType.UINT32 },
        { key: 'p2', type: PacketDataType.UINT32 },
        { key: 'tile', type: PacketDataType.UINT32 },
        { key: 'text', type: PacketDataType.STRING },
        { key: 'executionFrame', type: PacketDataType.UINT32 },
    ],
    [PacketType.INVALID_ADMIN_PACKET]: undefined,
}
