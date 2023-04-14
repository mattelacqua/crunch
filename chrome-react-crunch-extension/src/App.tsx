import React from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './types';

// Import Test
import Test from './Test'

// Import Socket IO
import io from 'socket.io-client';

// Create the socket
const socket = io();

class App extends React.Component {

  // State contains a list of agents (json format), and a bool for if the data loaded
  state = {
    title: "",
    headlines: [],
    test: "Oranges",
    testLoaded: false,
    socket: socket,
  };

  async update_test() {
    // Fetch for env info
    await fetch("http://localhost:5001/test.json") // Shorthand for http://localhost:5001/envInfo.json
      .then(res => res.json()) // Result becomes a json
      .then(result => 
      { let new_ref = result;
        this.setState({
            test: result.test,
            testLoaded: true,
        });
        console.log("Set new test_info from backend", new_ref);
      }
      ) 
      .catch(error => console.log('error catching test', error));  // take the json and set the state vars with it
    console.log("ASYNCH CALL HERE!");
  }
  
  componentDidMount() {
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      /**
       * Sends a single message to the content script(s) in the specified tab,
       * with an optional callback to run when a response is sent back.
       *
       * The runtime.onMessage event is fired in each content script running
       * in the specified tab for the current extension.
       */
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        { type: 'GET_DOM' } as DOMMessage,
        (response: DOMMessageResponse) => {
          this.setState({
                title: response.title,
              });
          this.setState({
                headlines: response.headlines,
              });
        });
    });

    this.update_test();
    setInterval(() => this.update_test(), 2000);
  }

  render () {
    return (
    <div className="App">
      <h1>SEO Extension built with React!</h1>

      <ul className="SEOForm">
        <li className="SEOValidation">
          <div className="SEOValidationField">
            <span className="SEOValidationFieldTitle">Title</span>
            <span className={`SEOValidationFieldStatus ${this.state.title.length < 30 || this.state.title.length > 65 ? 'Error' : 'Ok'}`}>
              {this.state.title.length} Characters
            </span>
          </div>
          <div className="SEOVAlidationFieldValue">
            {this.state.title}
          </div>
        </li>

        <li className="SEOValidation">
          <div className="SEOValidationField">
            <span className="SEOValidationFieldTitle">Main Heading</span>
            <span className={`SEOValidationFieldStatus ${this.state.headlines.length !== 1 ? 'Error' : 'Ok'}`}>
              {this.state.headlines.length}
            </span>
          </div>
          <div className="SEOVAlidationFieldValue">
            <ul>
              {this.state.headlines.map((headline, index) => (<li key={index}>{headline}</li>))}
            </ul>
          </div>
        </li>
      </ul>
      <Test test={this.state.test} 
            socket={this.state.socket} />
    </div>
  );
  }
}

export default App;