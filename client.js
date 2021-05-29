const ws = new WebSocket('ws://localhost:5501');
let clientId = null;

const btnLogout= document.getElementById('logout');
const btn = document.getElementById('loginButton');



btn.addEventListener('click', function(event){
    event.preventDefault();
    const request = {
        type: 'LOGIN',
        payload: {
            login: 'vasya',
            password: '123123',
        }
    }
    ws.send(JSON.stringify(request))
})

//
btnLogout.addEventListener('click', function (event){
    event.preventDefault();
    const request = {
        type: 'LOGOUT',
        payload: {
            userName: 'fdsfds',
            clientId: clientId
        }
    }

    console.log(JSON.stringify(request));

    ws.send(JSON.stringify(request));

})

ws.onmessage = function (message){
    console.log(message.data);
    const response = JSON.parse(message.data);
    switch(response.type){
        case 'LOGIN_RESPONSE':
            clientId = response.payload.clientId;
            console.log(response.payload.clientId);
            break;
        default:
            console.log('Unknown Response');
            break;

    }
}


ws.onopen = function() {
    // console.log('Client Connected');
}
