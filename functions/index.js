/* eslint-disable no-undef */
const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const { setGlobalOptions } = require("firebase-functions");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
 
 setGlobalOptions({maxInstances: 10})

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total)           
  if (total > 0) {
   const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.status(201).json({ 
      clientSecret: paymentIntent.client_secret,
     }); 
  } else {
    res.status(400).json({ message: "Invalid total" });
  }
}); 
exports.api = onRequest(app)