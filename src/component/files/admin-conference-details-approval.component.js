import React, {Component} from "react";
import ConferenceDetailsService from "../../service/form-conference-details.service";

export default class ConferenceDetailsApproval extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // name: '',
			// institute: '',
			// startDate: new Date(),
			// noOfDays: 0,
			// speakers: [],
			// speakerInstitutes: [],
            // approvalStatus: false,
            conferenceDetailsFormInfos: [],
        };
    }

    componentDidMount() {
        ConferenceDetailsService.getConferenceFormDetails().then((response) => {
            this.setState({
                conferenceDetailsFormInfos: response.data,
            });
            // console.log(response.data);
        })
    }

    handleApprove(event) {
		ConferenceDetailsService.updateConferenceFormDetailsApproval(
			this.setState({
                approvalStatus:true
            })

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
		).then(
			this.state.executionOption
		);		 

		alert(this.state.name + " conference details are approved");
		event.preventDefault();
		console.log(this.state.startDate);
		console.log(this.state.noOfDays)
	  }


      approve(id) {
        ConferenceDetailsService.updateConferenceFormDetailsApproval(id)
            .then((response) => {
                this.setState({
                updateMessage: response.data.message,
            });
                window.location.reload();
        }).catch(() => {
            this.setState({
                updateMessage: "Could not update status!",
            })
        });
    
    }

    render() {
        const {
            // name,
            // institute,
            // startDate,
            // noOfDays,
            // speakers,
            // speakerInstitutes,
            // approvalStatus
            conferenceDetailsFormInfos
        } = this.state;

        return (
            <div className="jumbotron">
                        <div className="alert bg-transparent">
                            <h4>Conference Details needed to be approve</h4>
                        </div>
                        <ul className="list-group list-group-flush">
                            {conferenceDetailsFormInfos && conferenceDetailsFormInfos.map((file, index) => (
                                <li className="list-group-item bg-transparent" key={index}>
                                    <h5 className="card-text">Conference Name : {file.name}</h5>
                                    <h5 className="card-text">Conducting Institute : {file.institute}</h5>
                                    <h5 className="card-text">Conference Starting date : {file.startDate}</h5> 
                                    <h5 className="card-text">No of days conference, going to be held : {file.noOfDays}</h5> 
                                    <h5 className="card-text">Speakers of conference : {file.speakers}</h5>
                                    <h5 className="card-text">Institutes of speakers : {file.speakerInstitutes}</h5>
                                    
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
                                                onClick={() => this.approve(file.id)}
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
        );
    }
}