
import express from "express";
import Stripe from "stripe";

const app = express();
app.use(express.json());

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);

// Example only: replace with database lookups.
const products = {
  movie1: { priceInCents: 1299 },
  movie2: { priceInCents: 899 },
};

app.post("/payments/stripe", async (req, res) => {
  try {
    const items = req.body.items as {
      id: keyof typeof products;
      quantity: number;
    }[];

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "Invalid cart",
      });
    }

    let amount = 0;

    for (const item of items) {
      const product = products[item.id];

      if (
        !product ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 100
      ) {
        return res.status(400).json({
          error: "Invalid product or quantity",
        });
      }

      amount += product.priceInCents * item.quantity;
    }

    if (amount < 50) {
      return res.status(400).json({
        error: "Amount is below the minimum",
      });
    }

    const intent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        // Attach a real, authenticated order ID here.
        source: "mobile-app",
      },
    });

    return res.json({
      paymentIntentClientSecret:
      intent.client_secret,
    });
  } catch {
    return res.status(500).json({
      error: "Unable to create payment",
    });
  }
});

app.listen(3000, () => {
  console.log("Payment API listening on port 3000");
});
