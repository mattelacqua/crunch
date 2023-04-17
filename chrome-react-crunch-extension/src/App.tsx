import React, {SyntheticEvent} from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './types';

// Import Test
import Test from './Test'

// Import Socket IO
import io, {Socket} from 'socket.io-client';

// Create the socket
const socket = io('http://localhost:5001');

type AppProps = {

}

type AppState = {
  id: string,
  idFound: Boolean,
  socket: Socket,
}

class App extends React.Component<AppProps, AppState> {

  // State contains a list of agents (json format), and a bool for if the data loaded
  constructor(props: AppProps){
    super(props);

    this.state = {
      id: "",
      idFound: false,
      socket: socket,
    };
      
    this.handleIDChange = this.handleIDChange.bind(this);
    this.handleIDSubmit = this.handleIDSubmit.bind(this);
  }

  handleIDChange(event: SyntheticEvent) {
    this.setState({id: ((event.target as HTMLInputElement).value) as string});
    console.log("ID Change: ", this.state.id);
  }

  handleIDSubmit(event: SyntheticEvent) {
    event.preventDefault();
    console.log("Client sending the ID", this.state.id);
    this.state.socket.emit('user_lookup', 
      {
        id: this.state.id,
      },
      (found: Boolean) => {
        if (found == true){
          this.setState({idFound: true});
          console.log("Id found, setting idFound=True");
        } else{
          console.log("Id not found. ");
        }
      }); // End emit
  }

  render () {
    return (
    <div className="App">
      <h1>Crunch: Data Tool for Job Seekers</h1>

      <form onSubmit={this.handleIDSubmit}>
        <label>
          UserID:
          <input type="text" name="id" onChange={this.handleIDChange}/>
        </label>
        <input type="submit" value="submit"/>
      </form>
    </div>
  );
  }
}

export default App;