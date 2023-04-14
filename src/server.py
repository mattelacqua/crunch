# Backend server using flask 

from flask import Flask, send_file
from flask_socketio import SocketIO
import os
import utils
import json
from flask_cors import CORS, cross_origin

# Fix payload issue
from engineio.payload import Payload
Payload.max_decode_packets = 100
print("Hello World, from the Server")



# Start up Flask web env
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


# start a socket
socketio = SocketIO(app,cors_allowed_origins="*")

# Home page for website, has all information we want on it
@app.route("/test.json")
@cross_origin()
def test():
    test_string = json.dumps({
        'test': "Test",
        'test2': "World",
    })
    return test_string

#Connect and Disconnect
@socketio.on('connect')
def test_connect(auth):
    print(f"New Socket Client Connection: {auth}")

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    socketio.run(app, port=5001)

