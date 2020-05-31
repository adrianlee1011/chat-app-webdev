import os

from flask import Flask, render_template, request, redirect, url_for, flash
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY") or "secret_key"
socketio = SocketIO(app)
rooms = {}

@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        chatroom = request.form.get("room-name")
        print(chatroom)
        rooms[chatroom] = {'messages': []}
    print(rooms)
    return render_template("index.html")


@app.route("/chat/<string:room>")
def chat_room(room):
    try:
        messageList = rooms[room]['messages']
    except KeyError:
        flash("No room found, please create a new room")
        return redirect(url_for('index'))
    print(messageList)
    return render_template("chat.html", messages=messageList)


@app.route("/chat")
def chat():
    return render_template("chat.html")


@socketio.on("send message")
def send(data):
    username = data['username']
    message = data['message']
    time = data['time']
    roomname = data['roomname']
    rooms[roomname]['messages'].append({'username': username, 'message': message, 'time': time})
    emit('announce message', {'username': username, 'message': message, 'time': time}, broadcast=True)