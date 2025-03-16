import { Server } from "socket.io";
import { GameConnection } from "./connection";

enum NotificationTypes {
    MESSAGE = 'message',
    LOADING = 'loading',
    CONNECTION = 'connection',
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
    io.emit(NotificationTypes.MESSAGE, {
        title,
        message,
        context
    });
}

function emitNotificationLoading(io: Server, loadingCategory: MessageLoadingCategory, progress: number, total: number): void {
    io.emit(NotificationTypes.LOADING, {
        loadingCategory,
        progress,
        total
    });
}

enum NotificationConnectionStatus {
    /* Connection has been interrupted unexpectedly */
    INTERRUPTED = "interrupted",
    /* Connection has completed being disconnected */
    DISCONNECTED = "disconnected",
    /* Server is attempting to connect */
    CONNECTING = "connecting",
    /* Server successfully made connection */
    CONNECTED = "connected",
    /* Server has voluntarily aborted trying to connect to the server */
    ABORTED = "aborted",
    /* Connection is unsuccessful */
    CONNECTION_UNSUCCESSFUL = "connection_unsuccessful",
}

function emitNotificationConnection(io: Server, status: NotificationConnectionStatus, saveId: number | null) {
    io.emit(NotificationTypes.CONNECTION, {
        status,
        saveId,
    });
}

export {
    NotificationTypes as NOTIFICATION_TYPES,
    MessageNotificationContext,
    NotificationEmitter,
    emitNotificationMessage,
    emitNotificationLoading,
    NotificationConnectionStatus,
    emitNotificationConnection,
}