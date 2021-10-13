import React, { Component } from "react";

import UserService from "../../service/user.service";
import UploadRPFiles from "../files/files-rp.component";

export default class BoardRP extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getRPBoard().then(
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
                <UploadRPFiles/>
            </div>
        );
    }
}