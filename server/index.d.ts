import { GameConnection, NotificationEmitter } from "./src/utils/connection";

declare global {
    namespace Express {
        export interface Request {
            activeConnection: GameConnection,
            emitNotification: NotificationEmitter
        }
    }
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string,
            HOST: string,
            PASS: string,
            NAME: string,
            OPENTTD_SERVER_IP: string,
            OPENTTD_SERVER_ADMIN_PORT: string,
            OPENTTD_SERVER_PORT: string,
            OPENTTD_SERVER_PASSWORD: string,
            OPENTTD_ADMIN_PASSWORD: string,
            SERVER_HOST: string,
            SERVER_PORT: string,
            BOT_NAME: string,
            VERSION: string,
            DB_HOST: string,
            DB_PASSWORD: string,
            DB_PORT: string,
            DB_NAME: string,
            DB_USER: string
        }
    }
}