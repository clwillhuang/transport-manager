import { Server } from "socket.io";
import { GameConnection } from "./connection";

enum NOTIFICATION_TYPES {
    MESSAGE = 'message',
    LOADING = 'loading'
}

enum MessageNotificationContext {
    SUCCESS = "success",
    PRIMARY = "primary",
    SECONDARY = "secondary",
    DANGER = "danger",
    WARNING = "warning",
    INFO = "info",
    LIGHT = "light",
    DARK = "dark"
}

/** The type of data being loaded over the game socket that is indicated by this loading message */
enum MessageLoadingCategory {
    COMPANY = "com",
    STATIONS = "sta",
    TOWNS = "tow",
    CARGO = "car",
    INDUSTRY = "ind",
    MONTHLY_STATS = "mon",
    INDUSTRY_TYPE = "typ",
    CARGO_WAITING_STATION_AT_VIA_FROM = "wai"
}

type NotificationEmitter = (event: string, data: { title: string; message: string; context?: MessageNotificationContext; }) => void;

/**
 * 
 * @param notificationEmitter 
 * @param title 
 * @param message 
 * @param context 
 */
function emitNotificationMessage(io: Server, title: string, message: string, context?: MessageNotificationContext): void {
    io.emit(NOTIFICATION_TYPES.MESSAGE, {
        title,
        message,
        context
    });
}

function emitNotificationLoading(io: Server, loadingCategory: MessageLoadingCategory, progress: number, total: number): void {
    io.emit(NOTIFICATION_TYPES.LOADING, {
        loadingCategory,
        progress,
        total
    });
}

export {
    NOTIFICATION_TYPES,
    MessageNotificationContext,
    NotificationEmitter,
    emitNotificationMessage,
    emitNotificationLoading
}