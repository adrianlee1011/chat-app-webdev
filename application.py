import os

from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)


@app.route("/", methods=['GET', 'POST'])
def index():
    return render_template("index.html")


@app.route("/chat")
def chat():
    return render_template("chat.html")

@socketio.on("send message")
def send(data):
    username = data['username']
    message = data['message']
    time = data['time']
    print("sending data")
    emit('announce message', {'username': username, 'message': message, 'time': time}, broadcast=True)