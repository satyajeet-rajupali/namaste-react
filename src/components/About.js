import User from "./User";
import UserClass from "./UserClass";
import React from "react";

class About extends React.Component {

    constructor(props) {
        super(props);
        console.log("Parent constructor\n");
    }

    componentDidMount() {
        console.log("Parent componentDidMount")
    }

    render() {
        console.log("Parent render")
        return (
            <div>
                <h1>About</h1>
                <h2>This is an about page</h2>
                {/* <User name={"Satya Jeet Raj upali"} location={"Deoria"} /> */}
                <UserClass name={"Satya Jeet Raj upali - (Class)"} location={"Deoria"} />
            </div>
        );
    }
}

export default About;