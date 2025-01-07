// express
const express = require('express');
const app = express();
const path = require('path');
// db 
const db = require('./config/connection')
// apollo 
// auth 
// schemas



// FOR SOCKET //
/* const {createServer} = require('http');
const {Server} = require('socket.io');

const httpServer = createServer();
const socket = new Server(httpServer,{});

socket.on('connection',(socket)=>{
    console.log(socket);
});

httpServer.listen(3000, () =>{
    console.log('server is connected')
}) */