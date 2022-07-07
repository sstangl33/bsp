import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US"],
        },
        phone_number_collection: {
          enabled: true,
        },
        shipping_options: [
          { shipping_rate: "shr_1LGmAFCud8EkbqVDfZEk8orz" },
          { shipping_rate: "shr_1LHEOyCud8EkbqVDLSNvZH3f" },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/lzx186hj/production/"
            )
            .replace("-png", ".png");

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}`,
        metadata: {
          athleteFirstName: "Ken",
          athleteLastName: "Jones",
          athleteNumber: "12",
          teamName: "Tigers",
          athleteAge: "10",
          athleteHeightFeet: "5",
          athleteHeightInches: "6",
          athletePosition: "Pitcher",
          coachesName: "Jim Sally",
        },
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
