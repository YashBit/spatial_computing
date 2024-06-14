import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51PKzDFRuOXcRVg15S7yy8vuJZFPG2IhOvGhGPvWLk1xAWLRdw3DPI7FrVTLcRtvF3hFDXnnRfiDHLjjP6aSjEzG600ocw2ZKER");
  }
  return stripePromise;
};

export default getStripe;