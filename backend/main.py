from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # depois coloque seu domínio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

VIATOR_API_KEY = os.getenv("VIATOR_API_KEY")
GETYOURGUIDE_API_KEY = os.getenv("GETYOURGUIDE_API_KEY")
TIQETS_API_KEY = os.getenv("TIQETS_API_KEY")


@app.get("/")
def home():
    return {"status": "API Online"}

@app.get("/api/tickets")
def get_tickets():

    results = []

    try:
        response = requests.get(
            "https://api.viator.com/partner/products/search",
            headers={
                "exp-api-key": VIATOR_API_KEY,
                "Accept": "application/json"
            },
            params={
                "searchTerm": "Disney Universal SeaWorld Busch Gardens Orlando",
                "currencyCode": "USD"
            }
        )

        if response.status_code == 200:
            data = response.json()
            for item in data.get("products", [])[:20]:
                results.append({
                    "park": identify_park(item.get("title")),
                    "title": item.get("title"),
                    "vendor": "Viator",
                    "price": item.get("pricing", {}).get("summary", {}).get("fromPrice", 0),
                    "url": item.get("productUrl")
                })

    except Exception as e:
        print("Erro API:", e)

    return results


def identify_park(title):
    if not title:
        return "Outros"

    if "Disney" in title:
        return "Disney"
    if "Universal" in title:
        return "Universal"
    if "SeaWorld" in title:
        return "SeaWorld"
    if "Busch" in title:
        return "Busch Gardens"

    return "Outros"