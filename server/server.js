// packages
const path = require('path');
const express = require('express');
const app = express();
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServer } = require('@apollo/server');
const http = require('http');
const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/mongo-adapter')

// db , auth , schemas
const PORT = process.env.PORT || 3001;
const db = require('./config/connection')
const { authMiddleware } = require('./utils/auth');
const {typeDefs,resolvers}= require('./schemas');


// socket.io and http
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// Apollo server 
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
})
// Apollo server with Middleware 
const startApolloServer = async () => {
    await apolloServer.start();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/graphql', expressMiddleware(apolloServer, { context: authMiddleware }));

    ///////// express static files go here //////////

    db.once('open', () => {
        console.log('MongoDB connection established');
        // connection with socket and db 
        io.adapter(createAdapter(db, { collection: 'socketio' }));
        // event handeling for socket io 
        io.on('connected', (socket) => {
            console.log('user is connected', socket.id);

            socket.on('disconnect', () => {
                console.log('User is disconnected:', socket.id);

            });
        });
        httpServer.listen(PORT, () => console.log(`On localhost:${PORT}`));
        console.log('graphQL at http://localhost:${PORT}/graphql');
    });

};
startApolloServer();

