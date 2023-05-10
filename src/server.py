# Backend server using flask 
from flask import Flask, send_file
from flask_socketio import SocketIO
import json
import random
from flask_cors import CORS, cross_origin

import utils

# Fix payload issue
from engineio.payload import Payload

import os, sys

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
                SELECT  *
                FROM user
                WHERE id = {id};
                ''')
    print(f"Looking up User: {data['id']}")
    res = user.fetchall()
    if res:
        print(f"Found {res}")
        res = res[0]
        ret_struct ={"id": res[0] if res[0] else None,
                    "name": res[1] if res[1] else None,
                    "birth": res[2] if res[2] else None,
                    "email": res[3] if res[3] else None,
                    "phone": res[4] if res[4] else None,
                    "linkedin": res[5] if res[5] else None,
                    "github": res[6] if res[6] else None,
                    "facebook": res[7] if res[7] else None,
                    "twitter": res[8] if res[8] else None,
                    "personal": res[9] if res[9] else None }
        print(f"Returning: {ret_struct}")
        return ret_struct
    else:
        print(f"Not found")
        return None

@socketio.on('user_form')
def user_form(data):
    """
    Use the info input to the form to add to the SQL query.
    """
    global c
    id = data['id']
    form_info = data['form_info']
    print(f"Got Form for user: {id}")
    print(form_info)
    
    insert_user = (f'''
                INSERT INTO  user
                (id, name, birth, email, phone, linkedin, github, facebook, twitter, personal) 
                VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);''', 
                (id, 
                 form_info["name"], 
                 form_info["birth"], 
                 form_info["email"], 
                 form_info["phone"], 
                 form_info["linkedin"], 
                 form_info["github"], 
                 form_info["facebook"], 
                 form_info["twitter"], 
                 form_info["personal"]))
    c.execute(*insert_user)
    c.commit()
    print(f"SQL Form addition committed")


    # Return success of user form query
    return False


if __name__ == '__main__':
    socketio.run(app, port=5001)

