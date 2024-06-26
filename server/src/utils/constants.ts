export enum PacketType {
    ADMIN_PACKET_ADMIN_JOIN = 0,             
    ADMIN_PACKET_ADMIN_QUIT = 1,             
    ADMIN_PACKET_ADMIN_UPDATE_FREQUENCY = 2, 
    ADMIN_PACKET_ADMIN_POLL = 3,             
    ADMIN_PACKET_ADMIN_CHAT = 4,             
    ADMIN_PACKET_ADMIN_RCON = 5,             
    ADMIN_PACKET_ADMIN_GAMESCRIPT = 6,       
    ADMIN_PACKET_ADMIN_PING = 7,             
    ADMIN_PACKET_ADMIN_EXTERNAL_CHAT = 8,    
    
    ADMIN_PACKET_SERVER_FULL = 100,      
    ADMIN_PACKET_SERVER_BANNED = 101,          
    ADMIN_PACKET_SERVER_ERROR = 102,           
    ADMIN_PACKET_SERVER_PROTOCOL = 103,        
    ADMIN_PACKET_SERVER_WELCOME = 104,         
    ADMIN_PACKET_SERVER_NEWGAME = 105,         
    ADMIN_PACKET_SERVER_SHUTDOWN = 106,        
    
    ADMIN_PACKET_SERVER_DATE = 107,            
    ADMIN_PACKET_SERVER_CLIENT_JOIN = 108,     
    ADMIN_PACKET_SERVER_CLIENT_INFO = 109,     
    ADMIN_PACKET_SERVER_CLIENT_UPDATE = 110,   
    ADMIN_PACKET_SERVER_CLIENT_QUIT = 111,     
    ADMIN_PACKET_SERVER_CLIENT_ERROR = 112,    
    ADMIN_PACKET_SERVER_COMPANY_NEW = 113,     
    ADMIN_PACKET_SERVER_COMPANY_INFO = 114,    
    ADMIN_PACKET_SERVER_COMPANY_UPDATE = 115,  
    ADMIN_PACKET_SERVER_COMPANY_REMOVE = 116,  
    ADMIN_PACKET_SERVER_COMPANY_ECONOMY = 117, 
    ADMIN_PACKET_SERVER_COMPANY_STATS = 118,   
    ADMIN_PACKET_SERVER_CHAT = 119,            
    ADMIN_PACKET_SERVER_RCON = 120,            
    ADMIN_PACKET_SERVER_CONSOLE = 121,         
    ADMIN_PACKET_SERVER_CMD_NAMES = 122,       
    ADMIN_PACKET_SERVER_CMD_LOGGING_OLD = 123, 
    ADMIN_PACKET_SERVER_GAMESCRIPT = 124,      
    ADMIN_PACKET_SERVER_RCON_END = 125,        
    ADMIN_PACKET_SERVER_PONG = 126,            
    ADMIN_PACKET_SERVER_CMD_LOGGING = 127,     
    
    INVALID_ADMIN_PACKET = 255,         
}

export enum NetworkErrorCode {
    NETWORK_ERROR_GENERAL = 0x00, // Try to use this one like never
   
    /* Signals from clients */
    NETWORK_ERROR_DESYNC = 0x01,
    NETWORK_ERROR_SAVEGAME_FAILED = 0x02,
    NETWORK_ERROR_CONNECTION_LOST = 0x03,
    NETWORK_ERROR_ILLEGAL_PACKET = 0x04,
    NETWORK_ERROR_NEWGRF_MISMATCH = 0x05,
   
    /* Signals from servers */
    NETWORK_ERROR_NOT_AUTHORIZED = 0x06,
    NETWORK_ERROR_NOT_EXPECTED = 0x07,
    NETWORK_ERROR_WRONG_REVISION = 0x08,
    NETWORK_ERROR_NAME_IN_USE = 0x09,
    NETWORK_ERROR_WRONG_PASSWORD = 0x0a,
    NETWORK_ERROR_COMPANY_MISMATCH = 0x0b, // Happens in CLIENT_COMMAND
    NETWORK_ERROR_KICKED = 0x0c,
    NETWORK_ERROR_CHEATER = 0x0d,
    NETWORK_ERROR_FULL = 0x0e,
    NETWORK_ERROR_TOO_MANY_COMMANDS = 0x0f,
    NETWORK_ERROR_TIMEOUT_PASSWORD = 0x10,
    NETWORK_ERROR_TIMEOUT_COMPUTER = 0x11,
    NETWORK_ERROR_TIMEOUT_MAP = 0x12,
    NETWORK_ERROR_TIMEOUT_JOIN = 0x13,
    NETWORK_ERROR_INVALID_CLIENT_NAME = 0x14,
   
    NETWORK_ERROR_END = 0x15,
};

export enum AdminUpdateFrequency {
    Automatic =  0x40,
    Annually =  0x20,
    Quarterly =  0x10,
    Monthly =  0x08,
    Weekly =  0x04,
    Daily =  0x02,
    Poll =  0x01
}

export enum AdminUpdateType {
    Date = 0x00,
    ClientInfo =  0x01,
    CompanyInfo = 0x02,
    CompanyEcon = 0x03,
    CompanyStats = 0x04,
    Chat = 0x05,
    Console = 0x06,
    CMDNames = 0x07,
    CMDLogging = 0x08,
    GameScript = 0x09,
    End = 0x0a
}

export enum GameScriptDataType {
    CARGO = 0,
    INDUSTRY_TYPE = 1,
    INDUSTRY = 2,
    TOWN = 3,
    STATION = 4,
    COMPANY = 5,
    MONTHLY_STATS = 6,
    CARGO_WAITING_STATION_AT_VIA_FROM = 7,
}

// Map GameScriptDataType to string
export const GSDataTypeFriendlyNames: Record<GameScriptDataType, string> = {
    [GameScriptDataType.CARGO]: "Cargo",
    [GameScriptDataType.INDUSTRY_TYPE]: "Industry Type",
    [GameScriptDataType.INDUSTRY]: "Industry",
    [GameScriptDataType.TOWN]: "Town",
    [GameScriptDataType.STATION]: "Station",
    [GameScriptDataType.COMPANY]: "Company",
    [GameScriptDataType.MONTHLY_STATS]: "Monthly Stats",
    [GameScriptDataType.CARGO_WAITING_STATION_AT_VIA_FROM]: "Cargo Waiting At-Via-From",
}
