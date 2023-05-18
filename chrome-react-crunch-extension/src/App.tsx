import React from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './types';
import axios, {AxiosInstance} from 'axios';
// Import Test
import UserIDLookup, {UserID} from './userID/UserIDLookup'

const backend : AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
});

// Create the socket
type AppProps = {
}

type AppState = {
  user: UserID | undefined,
}

class App extends React.Component<AppProps, AppState> {

  // State contains a list of agents (json format), and a bool for if the data loaded
  constructor(props: AppProps){
    super(props);

    this.state = {
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
      <h1>Welcome to Crunch: a Data Tool for Job Seekers</h1>

      <UserIDLookup lookup_cb={this.lookup_cb} backend={backend} />

    </div>
  );
  }
}

export default App;