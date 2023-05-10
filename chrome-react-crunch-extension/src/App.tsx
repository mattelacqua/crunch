import React from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './types';

// Import Test
import UserIDLookup, {UserID} from './userID/UserIDLookup'

// Import Socket IO
import io, {Socket} from 'socket.io-client';

// Create the socket

var socket: Socket;
socket = io('http://localhost:5001',
  {
    auth: {
      message: 'Hello from the plugin!', 
    }
  }
);

type AppProps = {

}

type AppState = {
  socket: Socket,
  user: UserID | undefined,
}

class App extends React.Component<AppProps, AppState> {

  // State contains a list of agents (json format), and a bool for if the data loaded
  constructor(props: AppProps){
    super(props);

    this.state = {
      socket: socket,
      user: undefined,
    };

    this.lookup_cb = this.lookup_cb.bind(this);

  }

  lookup_cb(user_ret: UserID | undefined) {
    if (user_ret != undefined){
      this.setState({user: user_ret});
    }
    console.log("Set state of user to:", user_ret);

  };

  render () {
    return (
    <div className="App">
      <h1>Crunch: Data Tool for Job Seekers</h1>

      <UserIDLookup lookup_cb={this.lookup_cb} socket={this.state.socket} />

    </div>
  );
  }
}

export default App;