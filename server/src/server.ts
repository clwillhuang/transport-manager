import { Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv';
dotenv.config();

const bodyParser = require('body-parser')
var cors = require('cors')
const app = require("express")()
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: process.env.ALLOWED_ORIGIN,
        credentials: true,
    }
})
import { GameConnection, createConnection } from "./utils/connection";
import gameSendRouter from './routes/socket';
import dataRouter from './routes/dataRoutes';
import { requireSave } from './middleware/saveMiddleware';
import saveRouter from './routes/saveRoutes';
import economyRouter from './routes/economyRoutes';
import calculateRouter from './routes/calculateRoutes';

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req: Request, res: Response, next: NextFunction) {
    // Debug by logging the url and request method for every endpoint
    console.log(`${req.method}: ${req.protocol}://${req.headers.host ?? ''}${req.url}`)
    // Emit a notification if the response code is > 399 regardless of whether next() used or json/status sent
    res.on('finish', () => {
        if (res.statusCode > 399) {
            activeConnection.emitNotification('message', { title: "Error", message: `Unexpected server error ${res.statusCode}: ${res.statusMessage}. ${req.originalUrl}`, context: "danger" })
        }
    });
    next()
})

export var activeConnection: GameConnection = {
    socket: null,
    serverName: null,
    saveId: null,
    io: io,
    emitNotification: io ? (event, data) => {
        console.log("emitting", event, data);
        io.emit(event, data);
    } : (event, data) => {
        console.log('could not emit', event, data)
    },
    queuedRequests: [],
}

const optionalActiveConnection = (req: Request, res: Response, next: NextFunction) => {
    req.activeConnection = activeConnection;
    next();
};

app.use('/socket/current', optionalActiveConnection)

app.get("/socket/current", (req: Request, res: Response) => {
    res.json({ serverName: activeConnection.serverName, saveId: activeConnection.saveId, socketReadyState: activeConnection?.socket?.readyState, gsQueue: activeConnection.queuedRequests })
})

// Define your middleware function to attach activeConnection to the request object
const requireActiveConnection = (req: Request & { activeConnection?: GameConnection }, res: Response, next: NextFunction) => {
    if (!activeConnection.socket || !activeConnection.serverName) {
        return res.status(404).json({ message: 'No connection found.' });
    }
    req.activeConnection = activeConnection; // Attach activeConnection to the request object
    next(); // Move to the next middleware or route handler
};

// Routes to send data over socket such as polls
app.use('/game/', requireActiveConnection)
app.use('/game/send/', gameSendRouter)

// Routes to retrieve data from a save game
app.use('/data/:saveGameId', requireSave)
app.use('/data/:saveGameId', optionalActiveConnection)
app.use('/data/:saveGameId', dataRouter)

app.use('/economies', economyRouter)

// Routes to create graphs
app.use('/calculate', calculateRouter)

// List of save games
app.use('/saves', saveRouter)

app.get("/socket/disconnect", (req: Request, res: Response) => {
    req.activeConnection = activeConnection
    if (req.activeConnection.socket) {
        req.activeConnection.socket!.end(Buffer.from(new Uint8Array([0x03, 0x00, 0x01])), () => { console.log("Ending This Connection") })
        req.activeConnection.emitNotification('message', { title: "Disconnect", message: "Disconnected from your OpenTTD game.", context: 'success'})
        res.json(200);
    } else {
        req.activeConnection.emitNotification('message', { title: "Disconnect", message: "Cannot disconnect, because there is no existing connection to OpenTTD!", context: 'warning' })
        res.json(200);
    }
})

app.use("/socket/connect", (req: Request, res: Response) => {
    req.activeConnection = activeConnection
    activeConnection.socket = createConnection(io, activeConnection);
    req.activeConnection.emitNotification('message', { title: "Connect", message: "Trying to connect to your OpenTTD game.", context: 'info' })
    res.status(200).json({
        'ip': process.env.OPENTTD_SERVER_IP as string,
        'port': process.env.OPENTTD_SERVER_ADMIN_PORT as string,
        'name': process.env.BOT_NAME as string,
        'version': process.env.VERSION as string,
    });
});

app.get("/send/ping", (req: Request, res: Response) => {
    activeConnection.emitNotification('message', { title: "Ping", message: "Pong", context: "success" })
    res.json(200);
})

app.get("/status", (_req: Request, res: Response) => {
    res.status(200).json({ 'message': `Server is up and allowing connections from ${process.env.ALLOWED_ORIGIN}.`})
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// must listen using server due to socket io
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on ${process.env.SERVER_PORT}`);
})