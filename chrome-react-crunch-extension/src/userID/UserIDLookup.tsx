import React, {SyntheticEvent} from 'react';
import {Socket} from 'socket.io-client';

import UserForm from './UserForm'

type UserIDLookupProps = {
  socket: Socket,
}

type UserIDLookupState = {
  id: string,
  idFound: Boolean,
  idSubmitted: Boolean,
}
// Create the socket
class UserIDLookup extends React.Component<UserIDLookupProps, UserIDLookupState> {

  // Constructor for component (set up what our App's state is)
  constructor(props: UserIDLookupProps) {
    super(props);

    this.state = {
      id: "",
      idFound: false,
      idSubmitted: false,
    };

    this.handleIDChange = this.handleIDChange.bind(this);
    this.handleIDSubmit = this.handleIDSubmit.bind(this);
  }

  // Handled the input to the text box changing
  handleIDChange(event: SyntheticEvent) {
    this.setState({id: ((event.target as HTMLInputElement).value) as string});
    console.log("ID Change: ", this.state.id);
  }

  // Handle the submission and lookup of the form.
  handleIDSubmit(event: SyntheticEvent) {
    event.preventDefault();
    console.log("Client sending the ID", this.state.id);
    this.props.socket.emit('user_lookup', 
      {
        id: this.state.id,
      },
      (found: Boolean) => {
        if (found == true){
          this.setState({idFound: true});
          console.log("Id found, setting idFound=True");
        } else {
          console.log("Id not found. ");
          this.setState({idSubmitted: true});
        }
      }); // End emit
  }

render () {
  return (
    <div>
      <div>
      <form onSubmit={this.handleIDSubmit}>
        <label>
          UserID Lookup:
          <input type="text" name="id" onChange={this.handleIDChange}/>
        </label>
        <input type="submit" value="submit"/>
      </form>
      </div>

      {  // If ID is not found but has been submitted
        (this.state.idSubmitted && !this.state.idFound) &&
        <div>
         <p> UserID not found. Please fill out the following form or provide a valid User ID. </p> 
         <UserForm
            id={this.state.id}
            socket={this.props.socket}
            />
        </div>
      }

      {  // If ID is found: Get their info available!
        (this.state.idSubmitted && this.state.idFound) &&
        <div>
         <p> UserID found. RENDER HERE THEIR INFO </p> 
        </div>
      }
    </div>
    );
  }
}

export default UserIDLookup;