import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../service/auth.service";
import UploadServiceRP from "../../service/file.service";
import PaymentPopup from "../payment/payment.component";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vemail = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

export default class Register extends Component {
    awaitPromise;

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRadio = this.onChangeRadio.bind(this);

        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            successful: false,
            message: "",
            userType:"",

            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            filemessage:"",
            executionOption:"",

            fileInfos: [],
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeRadio(e) {
        //console.log("Inside radio change");
        this.setState({
            userType: e.target.value
        });/*
        console.log("outside async");
        this.state.executionOption = async() => {
            console.log("Inside async");
            if(this.state.userType === "rp" || this.state.userType === "wp"){
                console.log("at upload option loading before");
                this.state.executionOption = await this.upload();
                console.log("at upload option loading after");
            }else if(this.state.userType === "attendee"){
                console.log("at upload option loading before");
                this.state.executionOption = await this.makePayment();
                console.log("at make payment option loading after");
            }
        }*/
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.username,
                this.state.email,
                this.state.userType,
                this.state.password
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            )/*.then(
                console.log("at execution option"),
                this.state.executionOption
            )*/
                .then( () => {
                    if(this.state.userType === "rp" || this.state.userType === "wp"){
                        console.log("inside upload before");
                        this.upload();
                        console.log("inside upload after");
                    }
                }
                ).then( () => {
                    if(this.state.userType === "attendee"){
                        console.log("inside payment before");
                        this.makePayment();
                        console.log("inside payment after");
                    }
                }
            );
        }
    }

    selectFile(event) {
        this.setState({
            selectedFiles: event.target.files,
        });
    }

    upload() {
        console.log("inside upload");
        let currentFile = this.state.selectedFiles[0];

        this.setState({
            progress: 0,
            currentFile: currentFile,
        });

        UploadServiceRP.uploadFile(currentFile, this.state.username, this.state.userType, (event) => {
            this.setState({
                progress: Math.round((100 * event.loaded) / event.total),
            });
        }).then((response) => {
                this.setState({
                    filemessage: response.data.message,
                });
                console.log(this.state.filemessage);
                return UploadServiceRP.getRPFiles();
            })
            .then((files) => {
                this.setState({
                    fileInfos: files.data,
                });
            })
            .catch(() => {
                this.setState({
                    progress: 0,
                    filemessage: "Could not upload the file!",
                    currentFile: undefined,
                });
                console.log(this.state.filemessage);
            });

        this.setState({
            selectedFiles: undefined,
        });
    }

    makePayment(){
        this.setState({
           filemessage: "Payment successful"
        });
    }

    render() {

        const {
            currentFile,
            progress,
            successful,
            username,
            email,
            userType,
            message,
            filemessage,
            password
        } = this.state;

        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <h2 style={{textAlign:'center'}} className="fw-bold">Sign Up</h2><br/>
{/*                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />*/}

                    <Form
                        onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    {/*<label htmlFor="username">Username</label>*/}
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={username}
                                        placeholder="Username"
                                        onChange={this.onChangeUsername}
                                        validations={[required, vusername]}
                                    />
                                </div>

                                <div className="form-group">
                                    {/*<label htmlFor="email">Email</label>*/}
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={email}
                                        placeholder="Email"
                                        onChange={this.onChangeEmail}
                                        validations={[required, vemail]}
                                    />
                                </div>

                                <div className="form-group">
{/*                                    <label htmlFor="password">Password</label>*/}
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                        placeholder="Password"
                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                    />
                                </div>

                                <div
                                    className="form-group"
                                    onClick={this.onChangeRadio}
                                >
                                    <label className="fw-bold">Choose User Type</label>
                                    <table>
                                        <tr>
                                            <td>
                                                <Input id="rp" type="radio" value="rp" name="userType"/>
                                            </td>
                                            <td>
                                                <label htmlFor="rp"> Research Publisher</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Input id="wp" type="radio" value="wp" name="userType"/>
                                            </td>
                                            <td>
                                                <label htmlFor="wp"> Workshop Presenter</label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Input id="attendee" type="radio" value="attendee" name="userType"/>
                                            </td>
                                            <td>
                                                <label htmlFor="attendee"> Attendee</label>
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                                { (userType === "rp" || userType === "wp") &&  (
                                    <div>
                                        {currentFile && (
                                            <div className="progress">
                                                <div
                                                    className="progress-bar progress-bar-info progress-bar-striped"
                                                    role="progressbar"
                                                    aria-valuenow={progress}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={{ width: progress + "%" }}
                                                >
                                                    {progress}%
                                                </div>
                                            </div>
                                        )}
                                        <div className="input-group mb-3">
                                            <div className="custom-file">
                                                <label className="btn btn-default">
                                                    <input
                                                        type="file"
                                                        onChange={this.selectFile}
                                                    />
                                                </label>
                                            </div>
                                        </div><br/>
                                    </div>
                                )}

                                {userType === "attendee" && (
                                    <div>
                                    <div style={{textAlign:'center'}} className="alert alert-secondary" role="alert">
                                        You will be charged Rs.350/= as registration fee
                                    </div>
                                    <PaymentPopup/>
                                    </div>
                                )}

                                <div className="form-group">
                                    <button className="btn btn-dark btn-block"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        )}

                        {message && (
                            <div className="form-group">
                                <div
                                    className={
                                        successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )}
                        {filemessage && (
                            <div className="form-group">
                                <div
                                    className={
                                        successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {filemessage}
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
            </div>
        );
    }
}