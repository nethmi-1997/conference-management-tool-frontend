import axios from 'axios'
import {properties} from "../properties";
import AuthService from "./auth.service";

const API_URL = properties.apiUrl + `/api/access/`

class UploadRPFilesService {
    uploadFile(file, name, userType, onUploadProgress) {
        console.log("inside upload method");

        let formData = new FormData();

        formData.append("file", file);
        formData.append("user", name);
        formData.append("approvalStatus", false);

        console.log("before if ");
        if(userType === "rp"){
            console.log("inside if ");
            formData.append("paymentStatus", false);
        }

        console.log("before return ");
        return axios.post(API_URL + userType + "/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }


    updateRPFileApproval(url){
        return axios.put(url+"/approval");
    }

    updateRPFilePayment(url){
        return axios.put(url+"/payment");
    }

    updateWPFileApproval(url){
        return axios.put(url);
    }

    getRPFiles() {
        return axios.get(API_URL + "rp/files");
    }

    getWPFiles() {
        return axios.get(API_URL + "wp/files");
    }
}

export default new UploadRPFilesService();