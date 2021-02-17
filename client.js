// const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:5501');

const btn = document.getElementById('loginButton');
const btnLogout= document.getElementById('logout');

btnLogout.addEventListener('click', function (event){
    event.preventDefault();
    const request = {
        type: 'logout',
        payload:{
            name: 'Vasya'
        }
    }
    ws.send(JSON.stringify(request));

})

btn.addEventListener('click', function(event){
    event.preventDefault();
    
    const login = document.getElementById('name').value;
    const request = {
        type: 'login',
        payload:{
            name: login
        }
    }
    ws.send(JSON.stringify(request));
});

ws.onmessage = function (message){
    console.log(message)

    const response = JSON.parse(message.data);

    switch (response.type){
        case 'login':
            if (response.payload.status === 200){
                window.href = 'chat.html';
            }else{
                console.error('Error');
            }
            // console.log(response.payload);
            break;
    }


}




ws.onopen = function() {
    console.log('Client Connected');
}
