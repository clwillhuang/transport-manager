import { GameConnection } from "../utils/connection";
import { NotificationEmitter } from '../utils/NotificationEmitter';

declare global {
    namespace Express {
        export interface Request {
            activeConnection: GameConnection,
            saveId: number,
            emitNotification: NotificationEmitter
        }
    }
}