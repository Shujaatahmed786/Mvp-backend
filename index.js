import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Enable JSON parsing

const SHOPIFY_API_URL =
  "https://your-store-name.myshopify.com/api/2024-01/graphql.json";

// Shopify Access Token (Store in .env file)
const ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

app.post("/add-to-cart", async (req, res) => {
  try {
    const response = await fetch(SHOPIFY_API_URL, {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
