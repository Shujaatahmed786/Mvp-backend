import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const SHOPIFY_API_URL = "https://logoanimation.myshopify.com/api/2024-01/graphql.json";
const ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN; // Ensure this is set properly

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Node server is running",
  });
});
app.post("/add-to-cart", async (req, res) => {
  if (!ACCESS_TOKEN) {
    return res.status(500).json({ error: "Shopify Access Token is not set." });
  }

  try {
    const response = await fetch(SHOPIFY_API_URL, {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong with Shopify API" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
