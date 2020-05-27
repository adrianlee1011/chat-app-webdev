document.addEventListener('DOMContentLoaded', () => {

    if (!window.localStorage.getItem('username')) {
        document.querySelector('#user-input').onsubmit = submitName;
    } else {
        user = localStorage.getItem('username');
        document.querySelector('#greetings').innerHTML = "Hello, " + user;
        document.querySelector('#user-input').style.display = 'none';
    }
});

function submitName() {
    const userInput = document.querySelector('#username').value;
    localStorage.setItem('username', userInput);
    document.querySelector('#greetings').innerHTML = "Hello, " + userInput;
    document.querySelector('#user-input').style.display = 'none';
    return false;
};