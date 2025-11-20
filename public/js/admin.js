/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51QmfEHI28N508uXGe5DpOhvZrIbC3b9m0kb5tW8bBSv19GHjyXsCBFwB0xDIEI2Q7VmuvNHZ2874OdjG5rfuqnWF00Zqc3vcsk',
);

export const createSectionByAdmin = async (data, section) => {
  try {
    let url = '';
    let returnPage = '';
    switch (section) {
      case 'user':
        url = 'http://127.0.0.1:3000/api/v1/users/signup';
        returnPage = '/dashboard/users';
        break;
      case 'tour':
        url = 'http://127.0.0.1:3000/api/v1/tours';
        returnPage = '/dashboard/tours';
        break;
      case 'review':
        url = 'http://127.0.0.1:3000/api/v1/reviews';
        returnPage = '/dashboard/reviews';
        break;
      case 'booking':
        return await bookTourForUser(
          data.tour,
          data.user,
          data.DateSelect,
          data.price,
        );
      default:
        return;
    }
    // console.log(url);
    // console.log(data);
    const res = await axios({
      method: 'POST',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert(
        'success',
        `${section.charAt(0).toUpperCase() + section.slice(1)} created successfully!`,
      );
      window.setTimeout(() => {
        location.assign(returnPage);
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const updateSectionByAdmin = async (data, section, id) => {
  try {
    let url = '';
    let returnPage = '';
    switch (section) {
      case 'user':
        url = `http://127.0.0.1:3000/api/v1/users/${id}`;
        returnPage = '/dashboard/users';
        break;
      case 'tour':
        url = `http://127.0.0.1:3000/api/v1/tours/${id}`;
        returnPage = '/dashboard/tours';
        break;
      case 'review':
        url = `http://127.0.0.1:3000/api/v1/reviews/${id}`;
        returnPage = '/dashboard/reviews';
        break;
      case 'booking':
        url = `http://127.0.0.1:3000/api/v1/bookings/${id}`;
        returnPage = '/dashboard/bookings';
        break;
      default:
        return;
    }
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert(
        'success',
        `${section.charAt(0).toUpperCase() + section.slice(1)} updated successfully!`,
      );
      window.setTimeout(() => {
        location.assign(returnPage);
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteSectionByAdmin = async (id, section) => {
  try {
    let url = '';
    switch (section) {
      case 'user':
        url = `http://127.0.0.1:3000/api/v1/users/${id}`;
        break;
      case 'tour':
        url = `http://127.0.0.1:3000/api/v1/tours/${id}`;
        break;
      case 'review':
        url = `http://127.0.0.1:3000/api/v1/reviews/${id}`;
        break;
      case 'booking':
        url = `http://127.0.0.1:3000/api/v1/bookings/${id}`;
        break;
      default:
        return;
    }
    const res = await axios({
      method: 'DELETE',
      url,
    });
    if (res.status === 204) {
      showAlert(
        'success',
        `${section.charAt(0).toUpperCase() + section.slice(1, -1)} deleted successfully!`,
      );
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

/**
 * Admin books a tour for another user
 */
export const bookTourForUser = async (tourId, userId, date, price) => {
  try {
    // 1) Get checkout session from API (admin endpoint)
    const session = await axios.get(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}/${date}/${price}/${userId}`,
    );

    // 2) Redirect to Stripe Checkout
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err.response.data.message);
    window.setTimeout(() => {
      location.assign('/add/booking');
    }, 1500);
  }
};
