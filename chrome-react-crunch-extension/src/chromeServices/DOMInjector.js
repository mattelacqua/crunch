import App from '../App';
import React from 'react';
import ReactDOM from 'react-dom';

const myDiv = document.createElement('div');
myDiv.id = 'my-id';
document.body.appendChild(myDiv);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  myDiv
);
