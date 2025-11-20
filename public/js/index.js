/* eslint-disable */
const validator = require('validator');
import axios from 'axios';
import '@babel/polyfill';
import { showAlert } from './alerts';
import { login, logout, deleteAccount } from './login';
import { updateSettings } from './updateSettings';
import { signup } from './signup';
import { bookTour } from './stripe';
import { reviewTour, updateReviewTour, deleteReviewTour } from './review';
import {
  createSectionByAdmin,
  updateSectionByAdmin,
  deleteSectionByAdmin,
} from './admin';

// DOM ELEMENTS
const signupForm = document.querySelector('.form--signup');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const createReview = document.getElementById('btn--review');
const reviewForm = document.querySelector('.form--review');
const updateReview = document.querySelector('.update-review');
const deleteReview = document.querySelector('.delete-review');
const addSection = document.getElementById('add-item');
const updateSection = document.getElementById('update-section');
const deleteItem = document.querySelector('.delete-item');
const deleteMyAccount = document.querySelector('.nav__el--delete_my_account');

// VALIDATION
// Generic validation function
async function validateTourName(value, errorSelector, message) {
  const errorElement = document.querySelector(errorSelector);
  if (!value || value.trim() === '') {
    showError(errorElement, 'Tour name is required!');
    return false;
  }
  try {
    const res = await axios.get(
      `http://127.0.0.1:3000/api/v1/tours/checkTourName/${value}`,
    );
    if (res.data.exists) {
      showError(errorElement, message); // e.g. "Tour name already exists!"
      return false;
    }
  } catch (err) {
    console.error(err);
    showError(errorElement, 'Error checking tour name!');
    return false;
  }
  hideError(errorElement);
  return true;
}

function validateDates(dates, errorSelector, message) {
  const errorElement = document.querySelector(errorSelector);
  const allFilled = dates.every((d) => d && d.trim() !== '');
  if (!allFilled) {
    showError(errorElement, message); // e.g. "All 3 start dates are required!"
    return false;
  }
  hideError(errorElement);
  return true;
}

function validateImages(files, errorSelector, message) {
  const errorElement = document.querySelector(errorSelector);
  if (!files || files.length < 3) {
    showError(errorElement, message); // e.g. "Please upload at least one image!"
    return false;
  }
  hideError(errorElement);
  return true;
}

function validateImageCover(file, errorSelector, message) {
  const errorElement = document.querySelector(errorSelector);
  if (!file) {
    showError(errorElement, message); // e.g. "Cover image is required!"
    return false;
  }
  hideError(errorElement);
  return true;
}

function validateFieldForAddSection(value, errorSelector, message) {
  const errorElement = document.querySelector(errorSelector);
  if (value === '0') {
    showError(errorElement, message);
    return false;
  }
  if (!value || value.trim() === '') {
    showError(errorElement, message);
    return false;
  } else {
    hideError(errorElement);
    return true;
  }
}

async function validateEmailForAddSection(value, errorSelector, message) {
  const errorElement = document.querySelector(errorSelector);
  if (!value || value.trim() === '' || !/\S+@\S+\.\S+/.test(value)) {
    showError(errorElement, 'email is required!');
    return false;
  }
  // check if email already exists in database or not
  try {
    const res = await axios.get(
      `http://127.0.0.1:3000/api/v1/users/checkEmail/${value}`,
    );
    if (res.data.exists) {
      showError(errorElement, message);
      return false;
    }
  } catch (err) {
    console.error(err);
    showError(errorElement, 'Error checking email!');
    return false;
  }
  hideError(errorElement);
  return true;
}

function validatePasswordForAddSection(value, errorSelector, message) {
  const errorElement = document.querySelector(errorSelector);
  if (!value || value.trim() === '') {
    showError(errorElement, 'Password is required!');
    return false;
  } else if (!validator.isStrongPassword(value)) {
    showError(errorElement, message);
    return false;
  } else {
    hideError(errorElement);
    return true;
  }
}

function validatePasswordConfirmForAddSection(
  value1,
  value2,
  errorSelector,
  message,
) {
  const errorElement = document.querySelector(errorSelector);
  if (!value2 || value2.trim() === '') {
    showError(errorElement, 'Password confirmation is required!');
    return false;
  } else if (value1 !== value2) {
    showError(errorElement, message);
    return false;
  } else {
    hideError(errorElement);
    return true;
  }
}

// SHOW ERRORS
function showError(error, message) {
  error.textContent = message;
  error.style.color = 'red';
  error.style.fontSize = '14px';
  error.style.marginTop = '5px';
  error.style.marginBottom = '1rem';
}

// HIDE ERRORS
function hideError(error) {
  error.textContent = '';
}

// DELEGATION

// Book tour [/tour/:slug]
document.addEventListener('DOMContentLoaded', function () {
  // i want that only when user want to book tour => /tour/:id
  if (
    !window.location.pathname.includes('/tour/') ||
    window.location.pathname.includes('/view/tour/') ||
    window.location.pathname.includes('/update/tour/')
  ) {
    return;
  }

  const dateInputs = document.querySelectorAll('input[name="tour-date"]');
  const ticketInput = document.getElementById('numTickets');
  const totalPrice = document.querySelector('.total');
  const bookButton = document.getElementById('book-tour');
  const basePrice = parseFloat(bookButton.getAttribute('data-tour-price'));
  const errorDate = document.querySelector('.error-date');
  const errorTickets = document.querySelector('.error-tickets');

  let selectedDate = '';
  let ticketCount = parseInt(ticketInput.value) || 1;
  let availableTickets = 0;

  function updateBookingInfo() {
    const total = basePrice * ticketCount;
    totalPrice.textContent = `${total} $`;

    if (!selectedDate) {
      showError(errorDate, 'Please select a date!');
      return;
    }

    hideError(errorDate);
    bookButton.setAttribute('data-tour-date', selectedDate);
    bookButton.setAttribute('data-tour-price', total);
  }

  function showError(error, message) {
    error.textContent = message;
    error.style.color = 'red';
    error.style.fontSize = '14px';
    error.style.marginTop = '5px';
    error.style.marginBottom = '1rem';
  }

  function hideError(error) {
    error.textContent = '';
  }

  async function fetchTourDetails(tourId, tourDate) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/api/v1/tours/${tourId}`,
      );

      if (response.data.status !== 'success') throw new Error('Tour not found');

      const tour = response.data.data.data;
      const startDateEntry = tour.startDates.find((d) => d.date === tourDate);

      if (startDateEntry) {
        availableTickets = tour.maxGroupSize - startDateEntry.bookedPersons;
        if (availableTickets == 0) {
          showError(errorTickets, 'There are no tickets available. Sold Out!');
          return;
        }
      } else {
        availableTickets = 0;
      }

      checkTicketAvailability();
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  }

  function checkTicketAvailability() {
    if (!selectedDate) showError(errorDate, 'Please select a date!');
    else if (availableTickets == 0 && selectedDate)
      showError(errorTickets, 'There are no tickets available. Sold Out!');
    else if (ticketCount > availableTickets)
      showError(
        errorTickets,
        'There are no tickets available. Please decrease the number of tickets.',
      );
    else hideError(errorTickets);
  }

  ticketInput.addEventListener('input', function () {
    ticketCount = Math.max(1, parseInt(this.value) || 1);
    checkTicketAvailability();
    updateBookingInfo();
  });

  dateInputs.forEach((input) => {
    input.addEventListener('change', async function (e) {
      selectedDate = this.value;
      hideError(errorDate);
      updateBookingInfo();

      const tourId = bookButton.getAttribute('data-tour-id');
      await fetchTourDetails(tourId, selectedDate);
    });
  });

  bookButton.addEventListener('click', function (event) {
    if (!selectedDate) {
      showError(errorDate, 'Please select a date!');
      event.preventDefault();
      return;
    }

    if (availableTickets == 0 && selectedDate) {
      showError(errorTickets, 'There are no tickets available. Sold Out!');
      event.preventDefault();
      return;
    }

    if (ticketCount > availableTickets) {
      showError(
        errorTickets,
        'There are no tickets available. Please decrease the number of tickets.',
      );
      event.preventDefault();
      return;
    }

    event.target.textContent = 'Processing...';
    // data-tour-id = tourId in javascript
    // data-tour-date = tourDate in javascript
    // tourId = event.target.dataset.tourId  === { tourId } = event.target.dataset
    const { tourId, tourDate, tourPrice } = event.target.dataset;
    bookTour(tourId, tourDate, tourPrice);
  });
});

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    const role = document.getElementById('role').value;
    signup(name, email, password, passwordConfirm, role);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

if (userDataForm) {
  // Preview user photo => show user photo when selecting a photo but not saved yet in database, should submit to be saved
  document.getElementById('photo').addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector('.form__user-photo').src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // create form-data to send it as object with file inside it
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    // console.log(document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (deleteMyAccount) {
  deleteMyAccount.addEventListener('click', async (e) => {
    e.preventDefault();

    const confirmDelete = confirm(
      'Are you sure you want to delete your account?',
    );
    if (!confirmDelete) return; // Stop execution if user clicks "Cancel"

    await deleteAccount();
  });
}

// favorite tours
document.addEventListener('DOMContentLoaded', async () => {
  if (
    !(
      window.location.origin + '/' === window.location.href ||
      window.location.pathname.includes('overview') ||
      window.location.pathname.includes('my-favorites-tours')
    )
  ) {
    return;
  }
  const favoriteCountEl = document.querySelector('.nav__favorite-count');
  let userDataText = document.querySelector('.user-hide')?.textContent.trim();

  // If user is logged in
  if (userDataText) {
    // Convert to valid JSON format
    const validJsonText = userDataText
      .replace(/new ObjectId\('([^']+)'\)/g, '"$1"') // Convert ObjectId to string
      .replace(/(\w+):/g, '"$1":') // Ensure property names are quoted
      .replace(/'/g, '"'); // Replace single quotes with double quotes
    const userData = JSON.parse(validJsonText);
    const favoriteTours = userData.favoriteTours;

    // Highlight favorite tours
    document.querySelectorAll('.heart-icon').forEach((icon) => {
      const tourId = icon.dataset.tourId;
      if (favoriteTours.includes(tourId)) {
        icon.classList.add('liked');
      }
    });

    // Add click event for logged-in users
    document.querySelectorAll('.heart-icon').forEach((icon) => {
      icon.addEventListener('click', async function () {
        const tourId = this.dataset.tourId;
        try {
          const response = await axios.patch(
            'http://127.0.0.1:3000/api/v1/users/favorite-tour',
            { tourId },
          );

          const count = response.data.favoriteCount;
          favoriteCountEl.textContent = count;
          favoriteCountEl.style.display = count === 0 ? 'none' : 'flex';

          if (response.data.status === 'success') {
            if (response.data.action === 'removed') {
              this.classList.remove('liked');
              showAlert('remove', 'Removed from favorite tours');

              // Check the user in favoritesTours page and removed tour should reload to show the page after removed tour
              if (window.location.href.includes('my-favorites-tours')) {
                setTimeout(() => window.location.reload(), 2000);
              }
            } else {
              this.classList.add('liked');
              showAlert('success', 'Added to favorite tours');
            }
          }
        } catch (err) {
          showAlert('error', err.response.data.message);
        }
      });
    });
  } else {
    // If user is NOT logged in, show alert when clicking heart icon
    document.querySelectorAll('.heart-icon').forEach((icon) => {
      icon.addEventListener('click', () => {
        showAlert('error', 'You need to log in to favorite this tour!');
      });
    });
  }
});

// show and hide dropdown
document.addEventListener('DOMContentLoaded', () => {
  if (
    window.location.pathname.includes('/login') ||
    window.location.pathname.includes('/signup') ||
    window.location.pathname.includes('/confirm-email')
  ) {
    return;
  }
  let userDataText = document.querySelector('.user-hide').textContent.trim();
  if (!userDataText) return;
  const userToggle = document.querySelector('.nav__user-toggle');
  const dropdown = document.querySelector('.nav__dropdown');

  userToggle.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('show');
  });

  // Close dropdown if clicking outside
  document.addEventListener('click', (e) => {
    if (!userToggle.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });
});

// if the user booked the tour from tour/:slug will go to create review
if (createReview) {
  createReview.addEventListener('click', async (event) => {
    event.preventDefault();
    const tourId = event.target.dataset.tourId;
    const userId = event.target.dataset.userId;
    const tourSlug = event.target.dataset.tourSlug;
    const errorMessageElement = document.getElementById('error-review');
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/api/v1/bookings/${userId}/${tourId}/bookings`,
      );

      const isBooked = response.data.results;
      if (!isBooked) {
        errorMessageElement.textContent = 'You have not booked this tour.';
        errorMessageElement.style.display = 'flex';
        return;
      }

      window.location.href = `/${tourSlug}/create-review`;
    } catch (error) {
      errorMessageElement.textContent =
        'Something went wrong. Please try again.';
      errorMessageElement.style.display = 'flex';
    }
  });
}

if (reviewForm) {
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btnReview = document.querySelector('.btn--createReview');
    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;
    const tourId = btnReview.getAttribute('data-tour-id');
    reviewTour(tourId, review, rating);
  });
}

if (updateReview) {
  updateReview.addEventListener('click', (e) => {
    e.preventDefault();
    const reviewId = e.target.dataset.reviewId;
    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;
    updateReviewTour(reviewId, review, rating);
  });
}

if (deleteReview) {
  deleteReview.addEventListener('click', async (e) => {
    e.preventDefault();

    const confirmDelete = confirm(
      'Are you sure you want to delete this review?',
    );
    if (!confirmDelete) return; // Stop execution if user clicks "Cancel"

    const reviewId = e.target.dataset.reviewId;

    await deleteReviewTour(reviewId);
  });
}

if (addSection) {
  addSection.addEventListener('click', async (e) => {
    e.preventDefault();
    let data;
    let name = '';
    let price;
    let tour;
    let user;
    const section = e.target.dataset.section;
    switch (section) {
      case 'user':
        name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm =
          document.getElementById('password-confirm').value;
        const role = document.getElementById('role').value;
        let isValidUser = true;

        isValidUser &= validateFieldForAddSection(
          name,
          '.error-name',
          'Name is required!',
        );
        isValidUser &= await validateEmailForAddSection(
          email,
          '.error-email',
          'Email already exists!',
        );
        isValidUser &= validatePasswordForAddSection(
          password,
          '.error-password',
          'Password must be strong. Please include at least 8 characters, one uppercase, one lowercase, one number, and one special character!',
        );
        isValidUser &= validatePasswordConfirmForAddSection(
          password,
          passwordConfirm,
          '.error-password-confirm',
          'Passwords do not match!',
        );
        if (!isValidUser) return;
        data = { name, email, password, passwordConfirm, role };
        break;
      case 'tour':
        name = document.getElementById('name').value;
        price = document.getElementById('price').value;
        const duration = document.getElementById('duration').value;
        const maxGroupSize = document.getElementById('maxGroupSize').value;
        const difficulty = document.getElementById('difficulty').value;
        const summary = document.getElementById('summary').value;
        const description = document.getElementById('description').value;
        const imageCoverFile = document.getElementById('imageCover').files[0];
        const imagesFiles = document.getElementById('images').files;
        const startDate1 = document.getElementById('startDate1').value;
        const startDate2 = document.getElementById('startDate2').value;
        const startDate3 = document.getElementById('startDate3').value;
        const address = document.getElementById('address').value;
        const descriptionLocation = document.getElementById(
          'description-location',
        ).value;
        const coordinates = document.getElementById('coordinates').value;
        let isValidTour = true;
        if (
          !(await validateTourName(
            name,
            '.error-name',
            'Tour name already exists!',
          ))
        )
          isValidTour = false;
        if (
          !validateFieldForAddSection(
            price,
            '.error-price',
            'Price must be greater than 0!',
          )
        )
          isValidTour = false;
        if (
          !validateFieldForAddSection(
            duration,
            '.error-duration',
            'Duration  must be greater than 0!',
          )
        )
          isValidTour = false;
        if (
          !validateFieldForAddSection(
            maxGroupSize,
            '.error-maxGroupSize',
            'MaxGroupSize must be greater than 0!',
          )
        )
          isValidTour = false;
        if (
          !validateFieldForAddSection(
            summary,
            '.error-summary',
            'Summary is required!',
          )
        )
          isValidTour = false;
        if (
          !validateFieldForAddSection(
            description,
            '.error-description',
            'Description is required!',
          )
        )
          isValidTour = false;
        if (
          !validateFieldForAddSection(
            coordinates,
            '.error-coordinates',
            'Coordinates are required!',
          )
        )
          isValidTour = false;
        if (
          !validateFieldForAddSection(
            address,
            '.error-address',
            'Address is required!',
          )
        )
          isValidTour = false;
        if (
          !validateFieldForAddSection(
            coordinates,
            '.error-description-location',
            'Description Location are required!',
          )
        )
          isValidTour = false;

        if (
          !validateImageCover(
            imageCoverFile,
            '.error-imageCover',
            'Cover image is required!',
          )
        )
          isValidTour = false;
        if (
          !validateImages(
            imagesFiles,
            '.error-images',
            'three image are required!',
          )
        )
          isValidTour = false;
        if (
          !validateDates(
            [startDate1, startDate2, startDate3],
            '.error-dates',
            'Please select three start date!',
          )
        )
          isValidTour = false;

        // stop if invalid
        if (!isValidTour) return;

        // Convert startDates to the required format
        const startDates = [
          { date: new Date(startDate1).toISOString() },
          { date: new Date(startDate2).toISOString() },
          { date: new Date(startDate3).toISOString() },
        ];

        // Convert coordinates to an array of numbers
        const [lat, lng] = coordinates.split(',').map(Number);

        // Create startLocation object
        const startLocation = {
          description: descriptionLocation,
          type: 'Point',
          coordinates: [lng, lat],
          address: address,
        };

        data = new FormData();
        data.append('name', name);
        data.append('price', price);
        data.append('duration', duration);
        data.append('maxGroupSize', maxGroupSize);
        data.append('difficulty', difficulty);
        data.append('summary', summary);
        data.append('description', description);
        data.append('startDates', JSON.stringify(startDates));
        data.append('startLocation', JSON.stringify(startLocation));

        if (imageCoverFile) {
          data.append('imageCover', imageCoverFile);
        }

        for (let i = 0; i < imagesFiles.length; i++) {
          data.append('images', imagesFiles[i]);
        }

        break;
      case 'review':
        tour = document.getElementById('tour_name').value;
        user = document.getElementById('user_name').value;
        const review = document.getElementById('review').value;
        const rating = document.getElementById('rating').value;
        let isValidReview = true;

        // if at least one field have error[false] not sent data to createSectionByAdmin
        isValidReview &= validateFieldForAddSection(
          tour,
          '.error-tour',
          'Please select a tour!',
        );
        isValidReview &= validateFieldForAddSection(
          user,
          '.error-user',
          'Please select a user!',
        );
        isValidReview &= validateFieldForAddSection(
          review,
          '.error-review',
          'Please enter a review!',
        );
        isValidReview &= validateFieldForAddSection(
          rating,
          '.error-rating',
          'Please enter a rating greater than 0!',
        );

        if (!isValidReview) return;
        data = { tour, user, review, rating };
        break;
      case 'booking':
        tour = document.getElementById('tour_name').value;
        user = document.getElementById('user_name').value;
        price = document.querySelector('.total').textContent;
        const DateSelect = document.getElementById('tour_date').value;

        let isValid = true;
        // if at least one field have error[false] not sent data to createSectionByAdmin
        isValid &= validateFieldForAddSection(
          tour,
          '.error-tour',
          'Please select a tour!',
        );
        isValid &= validateFieldForAddSection(
          user,
          '.error-user',
          'Please select a user!',
        );
        isValid &= validateFieldForAddSection(
          DateSelect,
          '.error-date',
          'Please select a date!',
        );

        if (!isValid) return;
        data = { tour, user, price, DateSelect };
        break;
      default:
        return;
    }

    createSectionByAdmin(data, section);
  });
}

// add section => review, booking
document.addEventListener('DOMContentLoaded', () => {
  if (!window.location.pathname.includes('/add/')) return;

  const sectionType = document.querySelector('[data-section]')?.dataset.section;

  if (sectionType === 'review') {
    HandelReview();
  } else if (sectionType === 'booking') {
    HandelBooking();
  }

  function HandelReview() {
    // review
    const tourSelectAtReview = document.getElementById('tour_name');
    const userSelectAtReview = document.getElementById('user_name');
    const reviewInput = document.getElementById('review');
    const ratingInput = document.getElementById('rating');
    const errorTourAtReview = document.querySelector('.error-tour');
    const errorUserAtReview = document.querySelector('.error-user');
    const errorReview = document.querySelector('.error-review');
    const errorRating = document.querySelector('.error-rating');

    // Handle tour selection at review
    tourSelectAtReview.addEventListener('change', (e) => {
      const tourId = e.target.value;
      if (!tourId) {
        showError(errorTourAtReview, 'Please select a Tour!');
        return;
      }
      hideError(errorTourAtReview);
    });

    // Handle user selection at review
    userSelectAtReview.addEventListener('change', (e) => {
      const userId = e.target.value;
      if (!userId) {
        showError(errorUserAtReview, 'Please select a User!');
        return;
      }
      hideError(errorUserAtReview);
    });

    // Handle review input
    reviewInput.addEventListener('input', (e) => {
      const review = e.target.value;
      if (!review) {
        showError(errorReview, 'Please enter a review!');
        return;
      }
      hideError(errorReview);
    });

    // Handle rating input
    ratingInput.addEventListener('input', (e) => {
      const rating = e.target.value;
      if (!rating || rating <= 0) {
        showError(errorRating, 'Please enter a rating greater than 0!');
        return;
      }
      hideError(errorRating);
    });
  }

  function HandelBooking() {
    // booking
    const tourSelect = document.getElementById('tour_name');
    const userSelect = document.getElementById('user_name');
    const tourDateSelect = document.getElementById('tour_date');
    const numTicketsInput = document.getElementById('numOfTickets');
    const totalSpan = document.querySelector('.total');
    const errorTour = document.querySelector('.error-tour');
    const errorUser = document.querySelector('.error-user');
    const errorDate = document.querySelector('.error-date');
    const errorTickets = document.querySelector('.error-tickets');

    let selectedDate = '';
    let ticketCount = parseInt(numTicketsInput.value) || 1;
    let availableTickets = 0;
    let tourData = null;

    // Handle tour selection
    tourSelect.addEventListener('change', async (e) => {
      const tourId = e.target.value;
      if (!tourId) {
        showError(errorTour, 'Please select a Tour!');
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/tours/${tourId}`,
        );

        if (response.data.status !== 'success')
          throw new Error('Tour not found');

        tourData = response.data.data.data;
        hideError(errorTour);

        // Reset dates
        selectedDate = '';
        availableTickets = 0;
        tourDateSelect.innerHTML = `<option value="">Select a tour date</option>`;

        tourData.startDates.forEach((dateObj) => {
          const dateStr = new Date(dateObj.date).toISOString();
          const opt = document.createElement('option');
          opt.value = dateStr;
          opt.textContent = new Date(dateStr).toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'long',
          });
          tourDateSelect.appendChild(opt);
        });

        ticketCount = Math.max(1, parseInt(numTicketsInput.value) || 1);
        updateTotal();
      } catch (err) {
        showAlert(
          'error',
          err.response?.data?.message || 'Error fetching tour data',
        );
      }
    });

    userSelect.addEventListener('change', async (e) => {
      const userId = e.target.value;
      if (userId) {
        hideError(errorUser);
      }
    });

    // Handle tour date selection
    tourDateSelect.addEventListener('change', function () {
      if (!tourData) {
        showError(errorTour, 'Please select a Tour!');
        return;
      }

      selectedDate = this.value;

      if (!selectedDate) {
        showError(errorDate, 'Please select a tour date!');
        return;
      }

      hideError(errorDate);

      const startDateEntry = tourData.startDates.find(
        (d) => new Date(d.date).toISOString() === selectedDate,
      );

      if (startDateEntry) {
        availableTickets = tourData.maxGroupSize - startDateEntry.bookedPersons;

        if (availableTickets === 0) {
          showError(errorTickets, 'There are no tickets available. Sold Out!');
          return;
        }

        if (ticketCount > availableTickets) {
          showError(
            errorTickets,
            'Not enough tickets. Please decrease the number.',
          );
          return;
        }

        hideError(errorTickets);
      }

      updateTotal();
    });

    // Handle ticket input changes
    numTicketsInput.addEventListener('input', function () {
      if (!tourData) {
        showError(errorTour, 'Please select a Tour!');
        return;
      } else {
        hideError(errorTour);
      }

      ticketCount = Math.max(1, parseInt(this.value) || 1);

      if (!selectedDate) {
        showError(errorDate, 'Please select a tour date!');
        return;
      } else {
        hideError(errorDate);
      }

      if (availableTickets === 0) {
        showError(errorTickets, 'There are no tickets available. Sold Out!');
      } else if (ticketCount > availableTickets) {
        showError(
          errorTickets,
          'Not enough tickets. Please decrease the number.',
        );
      } else {
        hideError(errorTickets);
      }

      updateTotal();
    });

    function updateTotal() {
      if (!tourData) {
        totalSpan.textContent = '0';
        return;
      }
      totalSpan.textContent = tourData.price * ticketCount;
    }
  }
});

if (updateSection) {
  updateSection.addEventListener('click', (e) => {
    e.preventDefault();
    let data;
    let name = '';
    let price;
    const section = e.target.dataset.section;
    const id = e.target.dataset.id;
    switch (section) {
      case 'user':
        name = document.getElementById('name').value;
        const role = document.getElementById('role').value;
        const active = document.querySelector(
          'input[name="active"]:checked',
        ).value;

        data = { name, role, active };
        break;
      case 'tour':
        name = document.getElementById('name').value;
        price = document.getElementById('price').value;
        const duration = document.getElementById('duration').value;
        const maxGroupSize = document.getElementById('maxGroupSize').value;
        const difficulty = document.getElementById('difficulty').value;
        const summary = document.getElementById('summary').value;
        const description = document.getElementById('description').value;
        const imageCover = document.getElementById('imageCover').files[0];
        const secretTour = document.querySelector(
          'input[name="secretTour"]:checked',
        ).value;

        data = new FormData();
        data.append('name', name);
        data.append('price', price);
        data.append('duration', duration);
        data.append('maxGroupSize', maxGroupSize);
        data.append('difficulty', difficulty);
        data.append('summary', summary);
        data.append('description', description);
        data.append('secretTour', secretTour);

        // Append the cover image if selected
        if (imageCover) {
          data.append('imageCover', imageCover);
        }
        break;
      case 'review':
        const review = document.getElementById('review').value;
        const rating = document.getElementById('rating').value;
        data = { review, rating };
        break;
      case 'booking':
        price = document.getElementById('price').value;
        const numbersOfPeople =
          document.getElementById('numbersOfPeople').value;
        data = { price, numbersOfPeople };
        break;
      default:
        return;
    }

    updateSectionByAdmin(data, section, id);
  });
}

// preview cover image on add and update tour using admin
document.addEventListener('DOMContentLoaded', function () {
  const imageInput = document.getElementById('imageCover');
  const imagePreview = document.querySelector('.form__tour-imageCover');

  if (imageInput) {
    imageInput.addEventListener('change', function (event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          if (imagePreview) {
            imagePreview.src = e.target.result; // Update preview image
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }
});

if (deleteItem) {
  document.querySelectorAll('.delete-item').forEach((button) => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();

      const confirmDelete = confirm('Are you sure you want to delete?');
      if (!confirmDelete) return; // Stop execution if user clicks "Cancel"
      const itemId = button.getAttribute('data-id');
      const section = button.getAttribute('data-section');

      await deleteSectionByAdmin(itemId, section);
    });
  });
}
