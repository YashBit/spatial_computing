
import Stripe from "stripe";

export const stripe = new Stripe("sk_test_51PKzDFRuOXcRVg15vZoXIroPTHRmbqePYHvkIPsUIKqyCb7eahP2jAUmkaZ6ofXYjLbO0HpB6FfwJtZDHdOnascq00CKFZmcIv", {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2024-04-10",
//   appInfo: {
//     name: "nextjs-with-stripe-typescript-demo",
//     url: "https://nextjs-with-stripe-typescript-demo.vercel.app",
//   },
});