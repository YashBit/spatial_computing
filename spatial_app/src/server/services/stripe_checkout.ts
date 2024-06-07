import { stripe } from "../../../lib/stripe";

export async function createCheckoutSession(
  data: number,
  origin: string
): Promise<{ client_secret: string | null; url: string | null }> {
  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "donate",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            product_data: {
              name: "Custom amount donation",
            },
            unit_amount: data * 100,
          },
        },
      ],
      success_url: `${origin}/convert_now/success`,
      cancel_url: `${origin}/convert_now/success`,
    });

    return {
      client_secret: checkoutSession.client_secret,
      url: checkoutSession.url,
    };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return { client_secret: null, url: null };
  }
}
