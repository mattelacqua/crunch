# Backend server using flask 
from flask import Flask, send_file
from flask_socketio import SocketIO
import json
import random
from flask_cors import CORS, cross_origin

import utils

# Fix payload issue
from engineio.payload import Payload
Payload.max_decode_packets = 100

# Start up Flask web env
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Start a socket
socketio = SocketIO(app,cors_allowed_origins="*")

# Connect to the database
c = utils.create_connection("./data/user.db")

# Home page for website, has all information we want on it
@app.route("/test.json")
@cross_origin()
def test():
    # Random test words
    test_words = ["Matt", "Colin", "Gianna"]
    test_string = json.dumps({
        'test': random.choice(test_words),
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

@socketio.on('user_lookup')
def user_lookup(data):
    """
    Lookup the user's info in the database. If its there, return True (probably should return everything)
    """
    global c
    id = data['id']
    print(f"C: {c}")
    user = c.execute(  f'''
                SELECT 1 
                FROM user
                WHERE id = {id};
                ''')
    print(f"Looking up User: {data['id']}")
    if user.fetchall():
        print(f"Found {id}")
        return True
    else:
        return False



if __name__ == '__main__':
    socketio.run(app, port=5001)

