import Express from "express";
import axios from "axios";

type IngredientsType = {
  malt: string[] | undefined;
};

type Beer = {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  ebc: number;
  ph: number;
  srm: number;
  vol: number;
  food_pairing: string[];
  price: number;
  ingredients?: IngredientsType;
};

const router = Express.Router();

// Get all beers
router.get("/", async (req, res) => {
  const response = await axios.get(
    "https://api.punkapi.com/v2/beers?page=1&per_page=20"
  );

  const data = response.data;
  const items = data.map((item: Beer) => {
    const price = item.id % 2 === 0 ? 9 : item.id % 3 === 0 ? 10 : 9.5;
    return {
      id: item.id,
      name: item.name,
      tagline: item.tagline,
      description: item.description,
      image_url: item.image_url,
      abv: item.abv,
      ibu: item.ibu,
      ebc: item.ebc,
      ph: item.ph,
      srm: item.srm,
      vol: 500,
      food_pairing: item.food_pairing,
      price: price,
    };
  });
  res.status(200).json(items);
});

// Get beer by id
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await axios.get(`https://api.punkapi.com/v2/beers/${id}`);
  const price = id % 2 === 0 ? 9 : id % 3 === 0 ? 10 : 9.5;
  const data = response.data;
  if (data.length === 0 || id > 20 || response.status !== 200) {
    res.status(404).json({ message: `Beer ${id} not found` });
  }
  const item = data.map((item: Beer): Beer => {
    return {
      id: item.id,
      name: item.name,
      tagline: item.tagline,
      description: item.description,
      image_url: item.image_url,
      abv: item.abv,
      ibu: item.ibu,
      ebc: item.ebc,
      ph: item.ph,
      srm: item.srm,
      vol: 0.5,
      food_pairing: item.food_pairing,
      price: price,
      ingredients: {
        malt: item.ingredients?.malt,
      },
    };
  });
  res.status(200).json(item);
});

export default router;
