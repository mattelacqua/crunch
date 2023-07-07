import React , {SyntheticEvent} from 'react';
import { UserID } from '../userID/UserTypes';
import { AxiosInstance } from 'axios';

type ApplicationMenuProps = {
    user: UserID,
    menu_state_cb: (next_state: string) => void, // Menu State change cb to app
    backend: AxiosInstance,
};

type ApplicationMenuState = {
    data: string,
    file: File | string
};

// Create the class
class ApplicationMenu extends React.Component<ApplicationMenuProps, ApplicationMenuState>{

    constructor(props: ApplicationMenuProps) {
        super (props);

        this.state = {
            data: "",
            file: ""
        };

        this.load_local_csv.bind(this);
        this.send_local_csv.bind(this);
    }

    load_local_csv(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            file: e.target.files ? e.target.files[0] : ""
        })
        console.log("Loaded the target file. Begin visualization TODO")
    }

    // callback to send the csv to the backend for parsing
    send_local_csv(event: SyntheticEvent) {
        console.log("Preparing to post file CSV to backend");
        event.preventDefault();
        var formData = new FormData();
        formData.append("file", this.state.file);
        const request = {
        method: 'POST',
        url: 'crunch/applications/import_csv/',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        }

        // Make the request
        this.props.backend
            .request(request)
            .then((data: any) => {
            console.log('Successful loading the application CSV', data);
            })
            .catch((error: any) => {
            console.log("Error adding the application CSV:", error.msg);
            });

    }

    // Add a button to add the files we have. 

    // Lookup what we have and visualize it.
    render() {
        return (
            <div>
                <p>Visualizing the Applications of: {this.props.user.name}. </p>;
                <button onClick={()=>this.props.menu_state_cb("menu-selection")}> Back to Menu </button>
                <input type="file" onChange={(e)=>this.load_local_csv(e)}/>
                <button onClick={(e)=>this.send_local_csv(e)}> Upload CSV </button>
                
            </div>
        );

    }

} // End Class

export default ApplicationMenu;