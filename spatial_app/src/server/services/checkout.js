import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }) {
  let stripePromise = null; // Explicitly specifying the type as Promise<any> | null

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_STRIPE_PUBLISHABLE_KEY);
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  if (stripe) {
    await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems,
      successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: window.location.origin
    });
  } else {
    console.error('Error loading Stripe');
    // Handle error, e.g., display an error message to the user
  }
}
