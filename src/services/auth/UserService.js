import axios from 'axios';

export default class UserService {
  find() {
    return axios.get('/api/user', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }
}
