const WebSocket = require('ws');
const fs = require('fs');
const uuidv1 = require('uuid/v1');


const wss = new WebSocket.Server({port: 5501});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        const request = JSON.parse(message);
        console.log(request);

        switch (request.type){
            case 'login':
                console.log(request.payload);

                const response = {
                    type: 'login',
                    payload:{
                        status: 200,
                        id: uuidv1()
                    }
                }

                ws.send(JSON.stringify(response));
                break;
            case 'logout':
                console.log(request.payload);
                break;
            default:
                console.log('Unknown request');
                break;
        }
        // console.log('received: %s', message);
    });

    ws.send('something');
});

//



wss.on('close', function(){
    console.log('Client left');
});


//
// wss.on('connection', function (ws) {
//     ws.on('message', function (data) {
//     }
//
//     ws.on('close', function () {
//     });
// }
