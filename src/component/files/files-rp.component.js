import React, {Component, useRef} from "react";
import UploadService from "../../service/file.service";
import AuthService from "../../service/auth.service";
import PaymentPopup from "../payment/payment.component";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

export default class UploadRPFiles extends Component {

    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.approve = this.approve.bind(this);
        this.toggleOnPayment = this.toggleOnPayment.bind(this);
        this.toggleOffPayment = this.toggleOffPayment.bind(this);
        this.handlePayment = this.handlePayment.bind(this);

        this.state = {
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",
            successful:false,

            fileInfos: [],
            userFileInfo:[],
            userType:"",
            updateMessage:"",
            showPayment:"hide"
        };

        if(AuthService.getCurrentUser() != null){
            for(var i = 0; i < AuthService.getCurrentUser().roles.length; i++){
                if(AuthService.getCurrentUser().roles[i] == "ROLE_REVIEWER"){
                    this.state.userType = "ROLE_REVIEWER";
                    break;
                } else if(AuthService.getCurrentUser().roles[i] == "ROLE_RP"){
                    this.state.userType = "ROLE_RP";
                    break;
                }
            }
        }
    }

    componentDidMount() {
        UploadService.getRPFiles().then((response) => {
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
        UploadService.updateRPFileApproval(url)
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

    toggleOnPayment() {
        this.setState({
            showPayment: "show"
        })
    }

    toggleOffPayment() {
        this.setState({
            showPayment: "hide"
        })
    }

    handlePayment(url){
        //e.preventDefault();
        console.log("inside handle payment");
        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            UploadService.updateRPFilePayment(url)
                .then((response) => {
                    this.setState({
                        message: response.data.message,
                        successful:true
                    });
                    console.log("payment successful");
                    window.location.reload();
                }).catch(() => {
                this.setState({
                    message: "Payment was unsuccessful. Please try again.",
                    successful: false
                })
                console.log("payment unsuccessful");
            });

        }
    }

    render() {
        const {
            userFileInfo,
            userType,
            fileInfos,
            showPayment,
        } = this.state;

        return (
            <div>
                {userType === "ROLE_REVIEWER" && (
                    <div className="jumbotron">
                        <div className="alert bg-transparent">
                            <h4>Research papers submitted by all the registered research publishers are listed below</h4>
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
                                        {file.approvalStatus === true && file.paymentStatus === true && (
                                            <button
                                                type="button"
                                                disabled={true}
                                                className="btn btn-dark btn-margin-right"
                                            >
                                                Approved
                                            </button>
                                        )}
                                        {file.approvalStatus === false && file.paymentStatus === false &&  (
                                            <button
                                                type="button"
                                                onClick={() => this.approve(this.id, file.url)}
                                                className="btn btn-dark btn-margin-right"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {file.approvalStatus === true && file.paymentStatus === false && (
                                            <button
                                                type="button"
                                                disabled={true}
                                                className="btn btn-dark btn-margin-right"
                                            >
                                                Payment Pending
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {userType === "ROLE_RP" &&  (
                    <div className="jumbotron">
                        {userFileInfo.approvalStatus === false && userFileInfo.paymentStatus === false && (
                            <div className="alert alert-dark" role="alert">
                                Your research publication is pending approval.
                            </div>
                        )}
                        {userFileInfo.approvalStatus === true && userFileInfo.paymentStatus === false && (
                            <div className="alert alert-dark" role="alert">
                                Your research publication has been approved. Make the payment to finalise the publication.
                            </div>
                        )}
                        {userFileInfo.approvalStatus === true && userFileInfo.paymentStatus === true && (
                            <div className="alert alert-dark" role="alert">
                                Your research publication has been published.
                            </div>
                        )}
                        {userFileInfo.name == null && (
                            <div className="alert alert-dark" role="alert">
                                You have not submitted a research paper.
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
                                    {userFileInfo.approvalStatus === true && userFileInfo.paymentStatus === false && (
                                        <button
                                            type="button"
                                            onClick={this.toggleOnPayment}
                                            /*onClick={() => this.approve(this.id, file.url)}*/
                                            className="btn btn-dark btn-margin-right"
                                        >
                                            Pay
                                        </button>
                                    )}
                                    {userFileInfo.approvalStatus === true && userFileInfo.paymentStatus === true && (
                                        <button
                                            type="button"
                                            disabled={true}
                                            className="btn btn-dark btn-margin-right"
                                        >
                                            Published
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
                        <Form
                            onClick={() => this.handlePayment(userFileInfo.url)}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            {showPayment === "show" && (
                                <div>
                                    <br/>
                                    <div className="alert alert-dark" role="alert">
                                        You will be charged Rs.650/= for the research presentation
                                        <button style={{float:'right'}} className="btn-close" onClick={this.toggleOffPayment}/>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="card card-container">
                                            <PaymentPopup/>
                                            <button
                                                className="btn btn-dark"
                                            >
                                                Confirm Payment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                    </div>
                )}
            </div>
        );
    }
}