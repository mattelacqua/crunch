import React, {SyntheticEvent} from 'react';
import UserForm from './UserForm';
import { AxiosInstance } from 'axios';



type UserIDLookupProps = {
  lookup_cb: (user_ret: UserID | undefined) => void // Lookup callback for the function
  backend: AxiosInstance
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
    this.getUserID = this.getUserID.bind(this);
  }

  // Handled the input to the text box changing
  handleIDChange(event: SyntheticEvent) {
    this.setState({id: ((event.target as HTMLInputElement).value) as string});
    console.log("ID Change: ", this.state.id);
  }

  // Handle the submission and lookup of the form.
  getUserID(event: SyntheticEvent) {
    event.preventDefault();
    console.log("Client sending the ID", this.state.id);

    const request = {
      method: 'GET',
      url: 'crunch/users/',
      params: {id: this.state.id},
      headers: {
        'Content-Type': 'application/json',
      }
    }

    this.props.backend
        .request(request)
        .then((data: any) => {
          console.log(data);
          this.setState({ idFound: true,
                          idSubmitted: true,
                          user: data});
          this.props.lookup_cb(data.user);
        })
        .catch((error: any) => {
          console.error('UserID Not Found:', error);
          this.setState({ idFound: false,
                          idSubmitted: true,
                          user: undefined});
        });
  }

render () {
  return (
    <div>
      <div>
      <form onSubmit={this.getUserID}>
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
            backend={this.props.backend}
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