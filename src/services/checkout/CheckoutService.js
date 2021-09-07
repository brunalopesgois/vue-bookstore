import axios from 'axios';

export default class CheckoutService {
  create(bookId, data) {
    return axios.post(`/api/checkout/books/${bookId}`,
      {
        card_number: data.cardNumber,
        owner_name: data.ownerName,
        expiration_date: data.date,
        cvv: data.securityNumber,
        mailtrap_user: data.user,
        mailtrap_password: data.password
      },
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
  }
}
