import { stripe } from "../../../lib/stripe";

export async function createCheckoutSession(
  data: number,
): Promise<{ client_secret: string | null; url: string | null; sessionId: string | null }> {
  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            product_data: {
              name: "Price Calculated from Video Length",
            },
            unit_amount: data * 100,
          },
        },
      ],
      success_url: `http://localhost:3000/convert_now/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/convert_now/payment_cancelled`,
    });

    return {
      client_secret: checkoutSession.client_secret,
      url: checkoutSession.url,
      sessionId: checkoutSession.id
    };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return { client_secret: null, url: null, sessionId: null };
  }
}
