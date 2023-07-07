import React from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './types';
import axios, {AxiosInstance} from 'axios';
// Import Test
import UserIDLookup from './userID/UserIDLookup'
import { UserID } from './userID/UserTypes'

// Menu Selection Import
import MenuSelection from './UserMenu/MenuSelection'

// Application Menu
import ApplicationMenu from './Applications/ApplicationMenu'

const backend : AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
});

// Create the socket
type AppProps = {
}

type AppState = {
  user: UserID,
  ext_state: string,
}

class App extends React.Component<AppProps, AppState> {

  // State contains a list of agents (json format), and a bool for if the data loaded
  constructor(props: AppProps){
    super(props);

    this.state = {
      user: {
        id: -1,
        name: "",
        birth: "",
        email: "",
        phone: "",
        linkedin: null,
        github: null,
        facebook: null,
        twitter: null,
        personal: null,
      },
      ext_state: "login",
    };

    this.lookup_cb = this.lookup_cb.bind(this);
    this.menu_selection_cb = this.menu_selection_cb.bind(this);

  }

  lookup_cb(user_ret: UserID | undefined) {
    if (user_ret != undefined){
      this.setState(
        {
          user: user_ret,
          ext_state: "menu-selection"
        });
      console.log("Set state of user to:", user_ret);
      console.log("Set state of extension to:", "menu-selection");
    }
    else {
      console.log("Setting user callback failed.");
    }
  };

  menu_selection_cb(next_state: string) {
    this.setState(
      {
        ext_state: next_state
      });
    console.log("Menu Button set extension state to ", next_state);
  };

  render () {
    return (
    <div className="App">
      <h1>Welcome to Crunch: a Data Tool for Job Seekers</h1>

      { /* Initial user login */
        (this.state.ext_state == "login") &&
        <UserIDLookup lookup_cb={this.lookup_cb} backend={backend} />
      }
      { /* Menu Selection Buttons*/
        (this.state.ext_state == "menu-selection") &&
        <MenuSelection menu_selection_cb={this.menu_selection_cb} user={this.state.user} backend={backend} />
      }
      { /* Application Visualization */
        (this.state.ext_state == "app-visualization") &&
        <ApplicationMenu menu_state_cb={this.menu_selection_cb} user={this.state.user} backend={backend} />
      }


    </div>
  );
  }
}

export default App;