/* eslint-disable */

export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) {
    el.classList.remove('show');
    el.classList.add('hide');
    setTimeout(() => el.remove(), 500); // after 0.5s remove the element
  }
};

// type could be 'success' or 'error'
export const showAlert = (type, msg) => {
  // hide previous alert before creating a new one
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  // afterbegin means add the element before the first child [add it in the beginning]
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);

  const alertBox = document.querySelector('.alert');
  setTimeout(() => alertBox.classList.add('show'), 50); // Delay 0.05s to trigger animation
  // after 5 seconds hide the alert
  window.setTimeout(hideAlert, 5000);
};
