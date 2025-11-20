/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successful!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message); // Server response with error
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
      withCredentials: true, // Tell browser to include cookies in request if don't write it the backend won’t know who you are (so req.cookies will be undefined).
    });

    if ((res.data.status = 'success')) {
      location.assign('/');
      // location.reload(true);
    }
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};

export const deleteAccount = async () => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: 'http://127.0.0.1:3000/api/v1/users/deleteMyAccount',
    });
    if ((res.data.status = 'success')) {
      showAlert('success', 'Account deleted successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error deleting account! Try again.');
  }
};
