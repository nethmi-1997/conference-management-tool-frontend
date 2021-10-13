import React, { Component } from "react";
import TemplateService from "../../service/template.service";

export default class TemplatesComponent extends Component {

    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);

        this.state = {
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",

            fileInfos: [],
            userFileInfo:[],
            userType:"",
        };
    }

    componentDidMount() {
        TemplateService.getTemplateFiles().then((response) => {
            this.setState({
                fileInfos: response.data,
            });
        });
    }

    selectFile(event) {
        this.setState({
            selectedFiles: event.target.files,
        });
    }

    render() {
        const {
            fileInfos,
        } = this.state;

        return (
            <div>
                <div className="jumbotron">
                    <div className="alert bg-transparent">
                        <h4>All the necessary templates are available for download below</h4>
                    </div>
                    <ul className="list-group list-group-flush">
                        {fileInfos && fileInfos.map((file, index) => (
                            <li className="list-group-item bg-transparent" key={index}>
                                {file.name}
                                <div className="float-lg-end">
                                    <a href={file.url+"/download"} target="_blank">
                                        <button className="btn btn-dark btn-margin-right">Download</button>
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}