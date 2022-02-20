// THIS CODE WONT RUN AT ALL

/*
* ///////////// Importing the express module and initiating it (app) /////////////
* https://expressjs.com/
* */
import express from 'express';
const app = express();

/*
* ///////////// Importing the http module to use it for integrating socket.io with express.js /////////////
* */
import http from 'http';

/*
* ///////////// Creating a http server using express' instance /////////////
* */
const server = http.createServer(app);

/*
* ///////////// Importing the Server class from socket.io module and initiating the socket.io using the above server /////////////
* */
import { Server } from 'socket.io';
const io = new Server(server);

import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

app.use(express.static('public'))

app.get('/socket', (req, res, next) => {  
    res.sendFile(__dirname + '/test/socket-io/index.html');
});

io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    socket.close();

    console.log("Token: ", token);

    next();
})

io.on('connection', (socket) => {

    socket.join("test room")
    console.log(socket.id);

    console.log('a user is connection')
    socket.on('disconnect', () => { 
        console.log('user disconnected');  
    });
    

    socket.on('chat message', (message) => {
        io.sockets.in('test room').emit("hi back", "test")
        console.log(message);
    })

    console.log('--------------------------------------------------')
})

export default server;