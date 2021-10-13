import React, { Component } from "react";

import UserService from "../../service/user.service";
import ConferenceDetailsService from "../../service/form-conference-details.service";
import homepagepic from "url:../../assets/af-homepage.jpg"


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            conferenceDetailsFormInfos: [],
        };
    }

    componentDidMount() {
        UserService.getPublicContentHome().then(
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

        ConferenceDetailsService.getConferenceFormDetails().then((response) => {
            this.setState({
                conferenceDetailsFormInfos: response.data,
            });
            // console.log(response.data);
        })
    }

    render() {
        const {
            conferenceDetailsFormInfos
        } = this.state;
        return (
            <div className="container">
                <header className="jumbotron">
                    <div className="card bg-dark text-white">
                        <img src={homepagepic} className="card-img-top" alt="1" />
                        <div className="card-img-overlay">
                            <h3>{this.state.content}</h3>
                        </div>
                    </div>
                    {/* <img src={homepagepic} alt="homepage image" /> */}
                </header>
                <div className="jumbotron">
                    <div className="alert bg-transparent">
                        <h4>Conference Details needed to be approve</h4>
                    </div>
                    <ul className="list-group list-group-flush">

                        {conferenceDetailsFormInfos && conferenceDetailsFormInfos.map((file, index) => (

                            <li className="list-group-item bg-transparent" key={index}>
                                {file.approvalStatus === true &&(
                                    <div>
                                        <h5 className="card-text">Conference Name : {file.name}</h5>
                                        <h5 className="card-text">Conducting Institute : {file.institute}</h5>
                                        <h5 className="card-text">Conference Starting date : {file.startDate}</h5>
                                        <h5 className="card-text">No of days conference, going to be held : {file.noOfDays}</h5>
                                        <h5 className="card-text">Speakers of conference : {file.speakers}</h5>
                                        <h5 className="card-text">Institutes of speakers : {file.speakerInstitutes}</h5>
                                    </div>
                                )}

                            </li>
                        ))}


                    </ul>
                </div>
            </div>
        );
    }
}