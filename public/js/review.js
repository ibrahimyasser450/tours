/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const reviewTour = async function (tourId, review, rating) {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/tours/${tourId}/reviews`,
      data: {
        review,
        rating,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Review submitted successfully!');
      window.setTimeout(() => {
        location.assign('/my-reviews');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updateReviewTour = async function (reviewId, review, rating) {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/reviews/${reviewId}`,
      data: {
        review,
        rating,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Review updated successfully!');
      window.setTimeout(() => {
        location.assign('/my-reviews');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteReviewTour = async function (reviewId) {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:3000/api/v1/reviews/${reviewId}`,
    });

    // 204 => No content
    if (res.status === 204) {
      showAlert('success', 'Review deleted successfully!');
      window.setTimeout(() => {
        location.assign('/my-reviews');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
