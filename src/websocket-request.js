'use strict'

const websocket = (request) => {
    let connection = request.accept(null, request.origin);
    connection.on('message', (message) =>{
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });

    connection.on('close', () => {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
}

module.exports = websocket