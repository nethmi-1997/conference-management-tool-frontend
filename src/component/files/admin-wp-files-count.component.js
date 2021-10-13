import React, {Component} from "react";
import UploadService from "../../service/file.service";

export default class WPFileStats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wpFileInfos: [],
            wpFileCount: 0,
            wpFilesPendingApprovalCount: 0,
            wpFilesApprovedCount: 0,
        };
    }

    componentDidMount() {
        UploadService.getWPFiles().then((response) => {
            this.setState({
                wpFileInfos: response.data,
            });
        }).then(() => {
            for(const [key, value] of Object.entries(this.state.wpFileInfos)){
                this.state.wpFileCount++;
                if(value.approvalStatus === false){
                    this.state.wpFilesPendingApprovalCount++;
                } else if(value.approvalStatus === true){
                    this.state.wpFilesApprovedCount++;
                }
            }
        })
    }

    render() {
        const {
            wpFileCount,
            wpFilesPendingApprovalCount,
            wpFilesApprovedCount,
        } = this.state;

        return (
            <div>
                <div className="alert alert-dark" role="alert">
                    <h4>Details about the workshop presentations submitted</h4>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <div className="card text-white bg-dark mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Total Submitted</h5>
                                <p className="card-text">{wpFileCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card text-white bg-dark mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Pending Approval</h5>
                                <p className="card-text">{wpFilesPendingApprovalCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card text-white bg-dark mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Approved</h5>
                                <p className="card-text">{wpFilesApprovedCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}