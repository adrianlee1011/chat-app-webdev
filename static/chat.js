const username = localStorage.getItem('username');

document.addEventListener('DOMContentLoaded', () => {
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect', () => {

        document.querySelector('#chatbox').onsubmit = () => {
            const message = document.querySelector('#message').value;
            
            var jsonMessage = {'username': username, 'message': message, 'time': Date()};
            
            socket.emit('send message', jsonMessage);
            return false;
        }
    });

    socket.on('announce message', data => {
        const li = document.createElement('li');
        li.innerHTML = `${data.username} at ${data.time}: ${data.message}`;
        document.querySelector('#chats').append(li);
    });
});

