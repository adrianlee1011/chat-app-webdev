const username = localStorage.getItem('username');
var pathname = window.location.pathname.split('/');
const roomname = pathname[2];


document.addEventListener('DOMContentLoaded', () => {
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    document.querySelector('#submit').disabled = true;

    document.querySelector('#message').onkeyup = () => {
        if (document.querySelector('#message').value.length > 0) {
            document.querySelector('#submit').disabled = false;
        }
        else {
            document.querySelector('#submit').disabled = true;
        }
    }

    socket.on('connect', () => {

        document.querySelector('#chatbox').onsubmit = () => {
            const message = document.querySelector('#message').value;
            
            document.querySelector('#message').value = '';
            document.querySelector('#submit').disabled = true;

            var jsonMessage = {'username': username, 'message': message, 'time': Date(), 'roomname': roomname};
            
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

