export enum NotificationConnectionStatus {
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