'use strict'

const eventController = require("./controllers/event.controller");
const estacaoController = require("./controllers/estacao.controller");

const websocket = async (request) => {
    let connection = request.accept(null, request.origin);
    
    connection.on('message', async (message) =>{
        if (message.type === 'utf8') {
            //GUID|Temperatura | Umidade | Pluviometria | Velocidade do vento | Direção do vento
            let arrayOfData = message.utf8Data.split("|");
            try {
                let estacao = await estacaoController.getByKeyAuth(arrayOfData[0]);
                console.log(`id estacao ${estacao.id}`);
                await eventController.create({
                    keyAuth:arrayOfData[0],
                    velocidadeVento:arrayOfData[4],
                    direcaoVento:arrayOfData[5],
                    preciptacaoChuva:arrayOfData[3],
                    temperatura:arrayOfData[1],
                    umidade:arrayOfData[2],
                    tempoInclusao:new Date(),
                    statusBateria: "",
                    idEstacao:estacao.id
                });
            } catch (error) {
                console.error('Não foi possivel salvar o evento: ' + error);
                
            }
            
            let objEvent = {
                Estacao:arrayOfData[0],
                Temperatura:arrayOfData[1],
                Umidade:arrayOfData[2],
                Pluviometria:arrayOfData[3],
                VelVento:arrayOfData[4],
                DirVento:arrayOfData[5],
            }
            console.log(`Received Message: ${message.utf8Data}`);
            console.log(`To Json Transfor: ${JSON.stringify(objEvent)}`);
            connection.sendUTF(`Received Message: ${message.utf8Data}`);
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