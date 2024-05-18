import { GameConnection, NotificationEmitter } from "../utils/connection";

declare global {
    namespace Express {
        export interface Request {
            activeConnection: GameConnection,
            saveId: number,
            emitNotification: NotificationEmitter
        }
    }
}