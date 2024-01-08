module.exports = function (io) {
    const connectedUsers = {};

    io.on("connection", (socket) => {
        console.log("New client connected, id: " + socket.id);

        // Store the socket.id along with the username (assuming it is sent by the client)
        socket.on("setUsername", (username) => {
            connectedUsers[socket.id] = username;
        });

        socket.on("sendMessage", (message) => {
            console.log("Received message from client:", message);

            // Assuming message is an object with 'content' property
            const senderUsername = connectedUsers[socket.id];
            io.emit("message", { username: senderUsername, content: message.content });
        });

        socket.on("disconnect", () => {
            const disconnectedUsername = connectedUsers[socket.id];
            delete connectedUsers[socket.id];

            console.log(`Client disconnected: ${disconnectedUsername}`);
        });
    });
};