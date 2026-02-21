import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.json({ status: "API Online 🚀" });
});

app.get("/api/tickets", async (req, res) => {
  const results = [];

  try {
    const viatorResponse = await axios.get(
      "https://api.viator.com/partner/products/search",
      {
        headers: {
          "exp-api-key": process.env.VIATOR_API_KEY,
          "Accept": "application/json"
        },
        params: {
          searchTerm: "Disney Universal SeaWorld Busch Gardens Orlando",
          currencyCode: "USD"
        }
      }
    );

    const products = viatorResponse.data.products || [];

    products.slice(0, 20).forEach(item => {
      results.push({
        park: identifyPark(item.title),
        title: item.title,
        vendor: "Viator",
        price: item.pricing?.summary?.fromPrice || 0,
        url: item.productUrl
      });
    });

  } catch (error) {
    console.error("Erro API:", error.message);
  }

  res.json(results);
});

function identifyPark(title = "") {
  if (title.includes("Disney")) return "Disney";
  if (title.includes("Universal")) return "Universal";
  if (title.includes("SeaWorld")) return "SeaWorld";
  if (title.includes("Busch")) return "Busch Gardens";
  return "Outros";
}

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
