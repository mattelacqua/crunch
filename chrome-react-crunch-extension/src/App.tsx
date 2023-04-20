import React from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './types';

// Import Test
import UserIDLookup from './userID/UserIDLookup'

// Import Socket IO
import io, {Socket} from 'socket.io-client';

// Create the socket
const socket = io('http://localhost:5001');

type AppProps = {

}

type AppState = {
  socket: Socket,
}

class App extends React.Component<AppProps, AppState> {

  // State contains a list of agents (json format), and a bool for if the data loaded
  constructor(props: AppProps){
    super(props);

    this.state = {
      socket: socket,
    };
      
  }

  render () {
    return (
    <div className="App">
      <h1>Crunch: Data Tool for Job Seekers</h1>

      <UserIDLookup socket={this.state.socket} />

    </div>
  );
  }
}

export default App;