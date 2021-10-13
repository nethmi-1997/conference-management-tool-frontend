import React, { Component } from "react";

import UserService from "../../service/user.service";
import Form1 from "./form-conference-details.component";

export default class BoardEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getEditorBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{this.state.content}</h3>
                </header>
                <header className="jumbotron">
                    <Form1/>
                </header>
            </div>
        );
    }
}