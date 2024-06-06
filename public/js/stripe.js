/*eslint-disable*/
import axios from "axios";
import { showAlert } from "./alerts";

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    "pk_test_51PNxl3H7rHnw7N6bHrcaKmwE80836tVFTHzl32m8nC47IBfvGBwyL1jYv3OE5kfFHEqmDpxhA7fXPRGadJqwTIvm00xYMCasTC",
  );
  //1)get checkout session from API
  try {
    const session = await axios.post(
      `http://127.0.0.1:3000/api/v1/booking/checkout-session/${tourId}`,
    );
    console.log(session);
    //2)create checkout form + charge credit card
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
