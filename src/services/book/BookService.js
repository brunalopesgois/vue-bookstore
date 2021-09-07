import axios from 'axios';

export default class BookService {
  list(currentPage) {
    return axios.get(`/api/books?page=${currentPage}`);
  }

  filter(value) {
    let params = new URLSearchParams([['search', value]]);
    return axios.get('/api/books/',
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
          "Content-Type": "application/json;charset=UTF-8"
        },
      },
      { params }
    );
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
