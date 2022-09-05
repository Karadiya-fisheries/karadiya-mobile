import axios from 'axios';

const BASE_URL = 'https://serene-woodland-83390.herokuapp.com/catch/';
class CatchService {
    getCatchs() {
        return axios.get(BASE_URL);
    }

    createCatch(Catch) {
        return axios.post(BASE_URL, Catch);
    }

    getCatchById(CatchId) {
        return axios.get(BASE_URL + CatchId);
    }

    updateCatch(Catch, CatchId) {
        return axios.put(`${BASE_URL}/${CatchId}`, Catch);
    }

    deleteCatch(CatchId) {
        return axios.delete(`${BASE_URL}/${CatchId}`);
    }
}

// export as a EmployeeService object
export default new CatchService();
