import { io } from 'socket.io-client';
import { baseUrl } from './serverConn';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';
const URL = baseUrl

export const socket = io(URL, { 
    withCredentials: true,
});