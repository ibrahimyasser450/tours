/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51QmfEHI28N508uXGe5DpOhvZrIbC3b9m0kb5tW8bBSv19GHjyXsCBFwB0xDIEI2Q7VmuvNHZ2874OdjG5rfuqnWF00Zqc3vcsk',
);

export const bookTour = async (tourId, date, price) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}/${date}/${price}`,
    );
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err.response.data.message);
    window.setTimeout(() => {
      // location.assign('/');
      location.reload();
    }, 1500);
  }
};
