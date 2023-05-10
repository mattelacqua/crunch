import React, {SyntheticEvent} from 'react';
import {Socket} from 'socket.io-client';

import UserForm from './UserForm'

type UserIDLookupProps = {
  socket: Socket,
  lookup_cb: (user_ret: UserID | undefined) => void // Lookup callback for the function
}

type UserIDLookupState = {
  id: string,
  idFound: Boolean,
  idSubmitted: Boolean,
  user: UserID | undefined
}

type UserID = {
  id: number,
  name: string,
  birth: string,
  email: string,
  phone: string,
  linkedin: string | null | undefined,
  github: string | null | undefined,
  facebook: string | null | undefined,
  twitter: string | null | undefined,
  personal: string | null | undefined,
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
      user: undefined
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
      (found: UserID | null | undefined) => {
        console.log("found", found);
        if (found !== null && found !== undefined){
          this.setState({ idFound: true,
                          idSubmitted: true,
                          user: found});
          console.log("Id found, setting idFound=True");
          console.log("Lookup CB found")
          this.props.lookup_cb(found);
        } else {
          console.log("Id not found. ");
          this.setState({idFound: false,
                         idSubmitted: true,
                         user: undefined});
          console.log("Lookup CB not found")
          this.props.lookup_cb(undefined);
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
        <p> User Info:  </p> 
        <p> {JSON.stringify(this.state.user)}</p>
        <p> Banana </p>
        </div>
      }
    </div>
    );
  }
}

export default UserIDLookup;
export type {UserID};