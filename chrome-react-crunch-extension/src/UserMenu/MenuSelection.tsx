import React from 'react';
import { UserID } from '../userID/UserTypes'
import { AxiosInstance } from 'axios'

type MenuSelectionProps = {
    user: UserID,
    menu_selection_cb: (next_state: string) => void, // Menu State change cb to app
    backend: AxiosInstance,
};

type MenuSelectionState = {
    next_state: string,
};

// Create the class
class MenuSelection extends React.Component<MenuSelectionProps, MenuSelectionState>{

    constructor(props: MenuSelectionProps) {
        super (props);

        this.state = {
            next_state: "",
        };
    }

    render() {
        return (
            <div>
                <p>Hello {this.props.user.name}! Please select from the following menu to continue. </p>;
                <button onClick={() => this.props.menu_selection_cb("app-visualization")}>Application Visualization</button>
            </div>
        );

    }

} // End Class

export default MenuSelection;