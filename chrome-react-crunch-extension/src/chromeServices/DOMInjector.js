import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

const myDiv = document.createElement('div');
myDiv.id = 'my-id';
document.body.prepend(myDiv);

ReactDOM.render(<App />, myDiv);
