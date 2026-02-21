import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 10000;

app.get("/api/tickets", async (req, res) => {
  try {
    const [viator, gyg, tiqets] = await Promise.all([
      fetchViator(),
      fetchGetYourGuide(),
      fetchTiqets()
    ]);

    const combined = [...viator, ...gyg, ...tiqets];

    const grouped = groupByPark(combined);

    res.json(grouped);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

async function fetchViator() {
  try {
    const response = await axios.get(
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

    return (response.data.products || []).map(item => ({
      park: identifyPark(item.title),
      title: item.title,
      vendor: "Viator",
      price: item.pricing?.summary?.fromPrice || 0,
      url: item.productUrl
    }));

  } catch {
    return [];
  }
}

async function fetchGetYourGuide() {
  try {
    const response = await axios.get(
      "https://api.getyourguide.com/v1/products",
      {
        headers: {
          Authorization: `Bearer ${process.env.GETYOURGUIDE_API_KEY}`
        },
        params: {
          query: "Orlando theme parks",
          currency: "USD"
        }
      }
    );

    return (response.data.data || []).map(item => ({
      park: identifyPark(item.title),
      title: item.title,
      vendor: "GetYourGuide",
      price: item.price?.amount || 0,
      url: item.url
    }));

  } catch {
    return [];
  }
}

async function fetchTiqets() {
  try {
    const response = await axios.get(
      "https://api.tiqets.com/v2/products",
      {
        headers: {
          Authorization: `Token ${process.env.TIQETS_API_KEY}`
        },
        params: {
          city: "Orlando",
          currency: "USD"
        }
      }
    );

    return (response.data.products || []).map(item => ({
      park: identifyPark(item.title),
      title: item.title,
      vendor: "Tiqets",
      price: item.price || 0,
      url: item.url
    }));

  } catch {
    return [];
  }
}

function groupByPark(data) {
  const parks = {};

  data.forEach(item => {
    if (!item.park) return;

    if (!parks[item.park]) parks[item.park] = [];

    parks[item.park].push(item);
  });

  Object.keys(parks).forEach(park => {
    const min = Math.min(...parks[park].map(p => p.price));
    parks[park] = parks[park].map(p => ({
      ...p,
      isBest: p.price === min
    }));
  });

  return parks;
}

function identifyPark(title = "") {
  if (title.includes("Disney")) return "Disney";
  if (title.includes("Universal")) return "Universal";
  if (title.includes("SeaWorld")) return "SeaWorld";
  if (title.includes("Busch")) return "Busch Gardens";
  return null;
}

app.listen(PORT, () => console.log("API rodando 🚀"));
