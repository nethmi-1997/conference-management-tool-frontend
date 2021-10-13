import React, {Component} from "react";
import UploadService from "../../service/file.service";

export default class RPFileStats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rpFileInfos: [],
            rpFileCount:0,
            rpFilesPendingApprovalCount:0,
            rpFilesPendingPaymentCount:0,
            rpFilesApprovedCount:0
        };
    }

    componentDidMount() {
        UploadService.getRPFiles().then((response) => {
            this.setState({
                rpFileInfos: response.data,
            });
        }).then(() => {
            for(const [key, value] of Object.entries(this.state.rpFileInfos)){
                this.state.rpFileCount++;
                if(value.approvalStatus === false && value.paymentStatus === false){
                    /*                    this.state.rpFilesPendingApproval = value;*/
                    this.state.rpFilesPendingApprovalCount++;
                } else if(value.approvalStatus === true && value.paymentStatus === false){
                    /*                    this.state.rpFilesPendingPayment = value;*/
                    this.state.rpFilesPendingPaymentCount++;
                } else if(value.approvalStatus === true && value.paymentStatus === true){
                    /*                    this.state.rpFilesApproved = value;*/
                    this.state.rpFilesApprovedCount++;
                }
            }
        })
    }

    render() {
        const {
            rpFileCount,
            rpFilesPendingApprovalCount,
            rpFilesPendingPaymentCount,
            rpFilesApprovedCount,
        } = this.state;

        return (
            <div>
                <div className="alert alert-dark" role="alert">
                    <h4>Details about the research publications submitted</h4>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <div className="card text-white bg-dark mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Total Submitted</h5>
                                <p className="card-text">{rpFileCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card text-white bg-dark mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Pending Approval</h5>
                                <p className="card-text">{rpFilesPendingApprovalCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card text-white bg-dark mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Pending Payment</h5>
                                <p className="card-text">{rpFilesPendingPaymentCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card text-white bg-dark mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Approved</h5>
                                <p className="card-text">{rpFilesApprovedCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}