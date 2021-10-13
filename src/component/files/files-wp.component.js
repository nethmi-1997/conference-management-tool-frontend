import React, { Component } from "react";
import UploadService from "../../service/file.service";
import AuthService from "../../service/auth.service";

export default class UploadWPFiles extends Component {

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

        if(AuthService.getCurrentUser() != null){
            for(var i = 0; i < AuthService.getCurrentUser().roles.length; i++){
                if(AuthService.getCurrentUser().roles[i] == "ROLE_REVIEWER"){
                    this.state.userType = "ROLE_REVIEWER";
                    break;
                } else if(AuthService.getCurrentUser().roles[i] == "ROLE_WP"){
                    this.state.userType = "ROLE_WP";
                    break;
                }
            }
        }
    }

    componentDidMount() {
        UploadService.getWPFiles().then((response) => {
            this.setState({
                fileInfos: response.data,
            });
        }).then(() => {
            for(const [key, value] of Object.entries(this.state.fileInfos)){
                if(AuthService.getCurrentUser().username == value.user){
                    this.state.userFileInfo = value;
                }
            }
        });
    }

    approve(id, url) {
        UploadService.updateWPFileApproval(url)
            .then((response) => {
                this.setState({
                    updateMessage: response.data.message,
                });
                window.location.reload();
            }).catch(() => {
            this.setState({
                updateMessage: "Could not update file!",
            })
        });
    }

    selectFile(event) {
        this.setState({
            selectedFiles: event.target.files,
        });
    }

    render() {
        const {
            userFileInfo,
            userType,
            fileInfos,
        } = this.state;

        return (
            <div>
                {userType == "ROLE_REVIEWER" &&  (
                    <div className="jumbotron">
                        <div className="alert bg-transparent">
                            <h4>Workshop presentations submitted by all the workshop presenters are listed below</h4>
                        </div>
                        <ul className="list-group list-group-flush">
                            {fileInfos && fileInfos.map((file, index) => (
                                <li className="list-group-item bg-transparent" key={index}>
                                    {file.name}
                                    <div className="float-lg-end">
                                        <a href={file.url+"/download"} target="_blank">
                                            <button className="btn btn-dark btn-margin-right">Download</button>
                                        </a>
                                        <a href={file.url+"/view"} target="_blank">
                                            <button className="btn btn-dark">View</button>
                                        </a>
                                    </div>
                                    <div className="float-lg-end">
                                        {file.approvalStatus === true && (
                                            <button
                                                type="button"
                                                disabled={true}
                                                className="btn btn-dark btn-margin-right"
                                            >
                                                Approved
                                            </button>
                                        )}
                                        {file.approvalStatus === false && (
                                            <button
                                                type="button"
                                                onClick={() => this.approve(this.id, file.url)}
                                                className="btn btn-dark btn-margin-right"
                                            >
                                                Approve
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {userType == "ROLE_WP" &&  (
                    <div className="jumbotron">
                        {userFileInfo.approvalStatus === false && (
                            <div className="alert alert-dark" role="alert">
                                Your workshop presentation is pending approval.
                            </div>
                        )}
                        {userFileInfo.approvalStatus === true && (
                            <div className="alert alert-dark" role="alert">
                                Your workshop presentation has been approved.
                            </div>
                        )}
                        {userFileInfo.name == null && (
                            <div className="alert alert-dark" role="alert">
                                You have not submitted a workshop presentation.
                            </div>
                        )}
                        <ul className="list-group list-group-flush">
                            {userFileInfo && userFileInfo.name != null &&
                            <li className="list-group-item bg-transparent" key={0}>
                                {userFileInfo.name}
                                <div className="float-lg-end">
                                    <a href={userFileInfo.url+"/download"} target="_blank">
                                        <button className="btn btn-dark btn-margin-right">Download</button>
                                    </a>
                                    <a href={userFileInfo.url+"/view"} target="_blank">
                                        <button className="btn btn-dark">View</button>
                                    </a>
                                </div>
                                <div className="float-lg-end">
                                    {userFileInfo.approvalStatus === true && (
                                        <button
                                            type="button"
                                            disabled={true}
                                            className="btn btn-dark btn-margin-right"
                                        >
                                            Approved
                                        </button>
                                    )}
                                    {userFileInfo.approvalStatus === false && (
                                        <button
                                            type="button"
                                            disabled={true}
                                            className="btn btn-dark btn-margin-right"
                                        >
                                            Not Approved
                                        </button>
                                    )}
                                </div>
                            </li>
                            }
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}