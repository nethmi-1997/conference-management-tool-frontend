import React, { Component } from "react";

import UserService from "../../service/user.service";
import UploadWPFiles from "../files/files-wp.component";

export default class BoardWP extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getWPBoard().then(
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
                <UploadWPFiles/>
            </div>
        );
    }
}