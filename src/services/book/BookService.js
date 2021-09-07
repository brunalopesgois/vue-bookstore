import axios from 'axios';

export default class BookService {
  list(currentPage) {
    return axios.get(`/api/books?page=${currentPage}`);
  }

  filter(value) {
    return axios.get(`/api/books?search=${value}`);
  }

  findById(id) {
    return axios.get(`/api/books/${id}`);
  }

  create(data) {
    return axios.post('/api/books', data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  update(id, data) {
    return axios.post(`/api/books/${id}`, data, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  delete(id) {
    return axios.delete(`/api/books/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }
}
