import axios from 'axios';

const BASE_URL = 'https://serene-woodland-83390.herokuapp.com/fishermen/';
class FishermenService {
  getFishermens() {
    return axios.get(BASE_URL);
  }

  createFishermen(fishermen) {
    return axios.post(BASE_URL, fishermen);
  }

  getFishermenById(fishermenId) {
    return axios.get(BASE_URL + fishermenId);
  }

  updateFishermen(fishermen, fishermenId) {
    return axios.put(`${BASE_URL}/${fishermenId}`, fishermen);
  }

  deleteFishermen(fishermenId) {
    return axios.delete(`${BASE_URL}/${fishermenId}`);
  }
}

// export as a EmployeeService object
export default new FishermenService();
