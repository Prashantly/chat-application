const app = require('express')();
const server = require("http").createServer(app)
const cors = require("cors")
const { Server } = require("socket.io");

// Define port and enable CORS for client-server communication
const PORT = 3001;
app.use(cors())

// Initialize Socket.IO server with CORS configuration
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

// Object to store connected users
let connectedUsers = {};

// Event listener for new socket connections
io.on("connection", (socket) => {

    // Add newly connected user to the connected users list
    connectedUsers[socket.id] = socket.id;

    // Emit updated user list to all clients
    io.emit('user_list', Object.values(connectedUsers));

    // Event listener for sending messages
    socket.on('send_message', (data) => {

        // Broadcast message to all clients except the sender
        socket.broadcast.emit('receive_message', data)
    })

    // Event listener for socket disconnection
    socket.on('disconnect', () => {

        // Remove disconnected user from the connected users list
        delete connectedUsers[socket.id];
        // Emit updated user list to all clients
        io.emit('user_list', Object.values(connectedUsers));
    })


})

// Start the server
server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});