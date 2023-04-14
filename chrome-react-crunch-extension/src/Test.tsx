import React from 'react';

// Import Socket IO
import {Socket} from 'socket.io-client';

type TestProps = {
  test: string,
  socket: Socket,
}

type MainState = {
  initial: string,
  fun: number,
}
// Create the socket
class Test extends React.Component<TestProps, MainState> {

  // Constructor for component (set up what our App's state is)
  constructor(props: TestProps) {
    super(props);

    // State contains a list of agents (json format), and a bool for if the data loaded
    this.state = {
      initial: props.test,
      fun: 0,
    };
    console.log(this.state.initial);
  }

  render () {
    return (
      <div>
        <h1> {this.props.test} </h1>
        <h1> {this.state.fun} </h1>
      </div>
    );
  }
}

export default Test;