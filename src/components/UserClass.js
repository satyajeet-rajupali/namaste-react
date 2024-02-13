import React from "react";

class UserClass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                name: "",
                location: "",
                avatar_url: "",
            }
        }
        console.log("Child constructor");
    }

    async componentDidMount() {
        const data = await fetch("https://api.github.com/users/satyajeet-rajupali");
        const json = await data.json();

        this.setState({
            userInfo: json,
        });
        
        console.log(json);
    }

    render() {
        console.log("Child render");
        const {name, location, avatar_url} = this.state.userInfo;

        return (
            <div className="user-card">
                <img src={avatar_url} alt="profile-image" />
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: satya_jeet_raj</h4>
            </div>
        );
    }
}

export default UserClass;