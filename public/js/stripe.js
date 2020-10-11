/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51HOeCAILnb1Uc6zg1Ai3LYiAnnnkSFnotbbkNErG6KtJcmHXKNCMQ2brNbAyHTlHOptJhKIGJPkpS3tu8ARc5cQD00NgoQFt8w'
);

export const bookTour = async tourID => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://localhost:1500/api/v1/bookings/checkout-session/${tourID}`
    );
    console.log(session);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
