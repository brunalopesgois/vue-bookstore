import axios from 'axios';

export default class LoginService {
  create(email, password) {
    return axios.post('/api/login', {
      email: email,
      password: password
    });
  }
}
