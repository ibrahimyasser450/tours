/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

function showFieldError(field, message) {
  const errorElement = document.getElementById(`${field}-error`);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontWeight = 'bold';
    errorElement.style.fontSize = '14px';
  }
}

function clearFieldError(field) {
  const errorElement = document.getElementById(`${field}-error`);
  if (errorElement) {
    errorElement.textContent = '';
  }
}

export const signup = async (name, email, password, passwordConfirm, role) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
        role,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Signed up successfully!');
      window.setTimeout(() => {
        location.assign('/confirm-email');
      }, 1500);
    }
  } catch (err) {
    // Clear all previous errors first
    clearFieldError('name');
    clearFieldError('email');
    clearFieldError('password');
    clearFieldError('password-confirm');
    clearFieldError('role');

    // Display the specific error messages under each field
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        showFieldError(error.field, error.message);
      });
    } else {
      // Show a generic error message if no specific field error is returned
      showAlert('error', err.response.data.message);
    }
  }
};

export const resetPassword = async (password, passwordConfirm, token) => {
  try {
    const res = await axios.patch(`/api/v1/users/resetPassword/${token}`, {
      password,
      passwordConfirm,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successful!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    // Clear all previous errors first
    clearFieldError('password');
    clearFieldError('password-confirm');

    // Display the specific error messages under each field
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        showFieldError(error.field, error.message);
      });
    } else {
      // Show a generic error message if no specific field error is returned
      showAlert('error', err.response.data.message);
    }
  }
};
