import axios from 'axios';
import authHeader from './auth-header';
import {properties} from "../properties";

const API_URL = properties.apiUrl + '/api/access/';

class UserService {
    getPublicContentHome() {
        return axios.get(API_URL + 'all/home');
    }

    getPublicContentRP() {
        return axios.get(API_URL + 'all/rp');
    }

    getPublicContentWP() {
        return axios.get(API_URL + 'all/wp');
    }

    getPublicContentDownload() {
        return axios.get(API_URL + 'all/download');
    }

    getPublicContentContactUs() {
        return axios.get(API_URL + 'all/contactus');
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }

    getEditorBoard() {
        return axios.get(API_URL + 'editor', { headers: authHeader() });
    }

/*    getReviewerBoard() {
        return axios.get(API_URL + 'reviewer', { headers: authHeader() });
    }*/

    getReviewerBoardRP() {
        return axios.get(API_URL + 'reviewer/rp', { headers: authHeader() });
    }

    getReviewerBoardWP() {
        return axios.get(API_URL + 'reviewer/wp', { headers: authHeader() });
    }

    getRPBoard() {
        return axios.get(API_URL + 'rp', { headers: authHeader() });
    }

    getWPBoard() {
        return axios.get(API_URL + 'wp', { headers: authHeader() });
    }

    getAttendeeBoard() {
        return axios.get(API_URL + 'attendee', { headers: authHeader() });
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }
}

export default new UserService();