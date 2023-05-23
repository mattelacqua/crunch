import React, {SyntheticEvent} from 'react';

import { AxiosInstance } from 'axios';

type UserFormProps = {
  id: string,
  backend: AxiosInstance
}

type UserFormState = {
  name: string,
  birth: string,
  email: string,
  phone: string,
  linkedin: string,
  github: string,
  facebook: string,
  twitter: string,
  personal: string,
  userAdded: Boolean,
}
// Create the socket
class UserForm extends React.Component<UserFormProps, UserFormState> {

  // Constructor for component (set up what our App's state is)
  constructor(props: UserFormProps) {
    super(props);

    this.state = {
      name: "",
      birth: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      facebook: "",
      twitter: "",
      personal: "",
      userAdded: false,
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // Handled the input to the text box changing
  handleFormChange(event: SyntheticEvent) {
    let state_var: string | null = (event.target as HTMLInputElement).getAttribute('name');
    switch(state_var){
      case "name": {
        this.setState({name: ((event.target as HTMLInputElement).value) as string});
        console.log("Change name: ", state_var, this.state.name);
        break;
      }
      case "birth": {
        this.setState({birth: ((event.target as HTMLInputElement).value) as string});
        console.log("Change birth: ", state_var, this.state.birth);
        break;
      }
      case "email": {
        this.setState({email: ((event.target as HTMLInputElement).value) as string});
        console.log("Change email: ", state_var, this.state.email);
        break;
      }
      case "phone": {
        this.setState({phone: ((event.target as HTMLInputElement).value) as string});
        console.log("Change phone: ", state_var, this.state.phone);
        break;
      }
      case "linkedin": {
        this.setState({linkedin: ((event.target as HTMLInputElement).value) as string});
        console.log("Change linkedin: ", state_var, this.state.linkedin);
        break;
      }
      case "facebook": {
        this.setState({facebook: ((event.target as HTMLInputElement).value) as string});
        console.log("Change facebook: ", state_var, this.state.facebook);
        break;
      }
      case "twitter": {
        this.setState({twitter: ((event.target as HTMLInputElement).value) as string});
        console.log("Change twitter: ", state_var, this.state.twitter);
        break;
      }
      case "personal": {
        this.setState({personal: ((event.target as HTMLInputElement).value) as string});
        console.log("Change personal: ", state_var, this.state.personal);
        break;
      }
      default:{
        break;
      }
    }
  }

  // Handle the submission and lookup of the form.
  handleFormSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const request = {
      method: 'POST',
      url: 'crunch/users/',
      data: {
        name: this.state.name,
        birth: this.state.birth,
        email: this.state.email,
        phone: this.state.phone,
        linkedin: this.state.linkedin,
        github: this.state.github,
        facebook: this.state.facebook,
        twitter: this.state.twitter,
        personal: this.state.personal,
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }
    this.props.backend
        .request(request)
        .then((data: any) => {
          console.log('User added to database', data);
          this.setState({userAdded: true});
        })
        .catch((error: any) => {
          console.log("Adding user to database has failed");
          console.log(error.msg);
          this.setState({userAdded: false});
        });

    /*this.props.socket.emit('user_form', 
        // Parameters
        {
          id: this.props.id,
          form_info: this.state,
        },
        // Callback
        (added: Boolean) => {
          if (added == true){
            this.setState({userAdded: true});
            console.log("User has been added to database");
          } else {
            console.log("Adding user to database has failed");
            this.setState({userAdded: false});
          }
        }); // End emit*/
  }

render () {
  return (
    <div>
      <div>
      <form onSubmit={this.handleFormSubmit}>
        <label>Name:
          <input type="text" name="name" onChange={this.handleFormChange}/>
        </label>
        <label> Birth: 
          <input type="text" name="birth" onChange={this.handleFormChange}/>
        </label>
        <label> Email: 
          <input type="text" name="email" onChange={this.handleFormChange}/>
        </label>
        <label> Phone: 
          <input type="text" name="phone" onChange={this.handleFormChange}/>
        </label>
        <label> Linkedin: 
          <input type="text" name="linkedin" onChange={this.handleFormChange}/>
        </label>
        <label> Github: 
          <input type="text" name="github" onChange={this.handleFormChange}/>
        </label>
        <label> Facebook: 
          <input type="text" name="facebook" onChange={this.handleFormChange}/>
        </label>
        <label> Twitter: 
          <input type="text" name="twitter" onChange={this.handleFormChange}/>
        </label>
        <label> Personal: 
          <input type="text" name="personal" onChange={this.handleFormChange}/>
        </label>
        <label> Current Employer: 
          <input type="text" name="curr_employer" onChange={this.handleFormChange}/>
        </label>
        <label> Submit: 
          <input type="submit" value="submit"/>
        </label>
      </form>
      </div>
    </div>
    );
  }
}

export default UserForm;