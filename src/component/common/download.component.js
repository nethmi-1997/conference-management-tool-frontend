import React, { Component } from "react";

import UserService from "../../service/user.service";
import TemplatesComponent from "../files/templates.component";

export default class Download extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getPublicContentDownload().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div className="container">
                <TemplatesComponent/>
            </div>
        );
    }
}