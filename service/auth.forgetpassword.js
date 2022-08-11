import axios from "axios";

const API_URL = "https://serene-woodland-83390.herokuapp.com/api/auth/";

class PassService {

    forgot_password(email) {
        return axios.post(API_URL + "forgot-password", {
            email,
        });
    }

    reset_password(password, token) {
        return axios.post(API_URL + "reset-password/" + token, {
            password,
        });
    }
}

export default new PassService();
