const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 9999 });

server.on('connection', (ws) => {
    console.log('New client connected');
});

server.broadcast = function(data) {
    server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

server.on('connection', (socket) => {
  console.log('New client connected');
    socket.on('message', (message) => {
        // console.log(`Received message: ${message}`);
        console.log(`Received data chunk: ${message}`);
    });
});

console.log('WebSocket server is running on ws://localhost:9999');
