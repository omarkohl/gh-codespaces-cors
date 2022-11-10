import React from "react";


let API_URL = "http://localhost:8080";

if (process.env.REACT_APP_API_URL) {
    API_URL = process.env.REACT_APP_API_URL;
}

class UserCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true, message: "", error: null};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let userData = {
            name: "Tom",
            age: 23,
        };
        fetch(API_URL + `/api/user`, {
            credentials: 'include',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: userData})
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        error: null,
                        message: result.message,
                    });
                },
                (error) => {
                    this.setState({
                        error: error,
                        message: "",
                    });
                }
            )
    }

    render() {
        const { error, message } = this.state;
        let messageBox;
        if (error) {
            messageBox = <p className="message">{error.message}</p>
        } else {
            messageBox = <p className="message">{message}</p>
        }
        return (
            <div className="user-creator">
                <button onClick={this.handleClick}>Create User</button>
                {messageBox}
            </div>
        );
    }
}

export default UserCreator;