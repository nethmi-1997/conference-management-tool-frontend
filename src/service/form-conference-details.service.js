import axios from "axios";

const API_URL = "http://localhost:8080/api/access/conferenceDetails";

class FormConferenceDetailsService {
    submit(name, institute, startDate, noOfDays, speakers, speakerInstitutes, ) {
        return axios.post(API_URL , {
            // return axios.post(API_URL + "conferenceDetails", {
            name,
			institute,
			startDate,
			noOfDays,
			speakers,
			speakerInstitutes,
        });
    }

    updateConferenceFormDetailsApproval(id){
        return axios.put(API_URL + "/" + id +"/approval");
    }

    getConferenceFormDetails() {
        // return axios.get(API_URL + "conferenceDetails");
        return axios.get(API_URL);
    }

}

export default new FormConferenceDetailsService();