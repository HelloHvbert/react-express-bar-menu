export interface Beer {
  id: number;
  name: string;
  tagline: string;
  description: string;
  abv: number;
  image_url: string;
  ibu: number;
  ph: number;
  ebc: number;
  srm: number;
  vol: number;
  food_pairing: string[];
  price: number;
  ingredients?: {
    malt: { name: string }[];
  };
}

export interface BeerList {
  beers: Beer[];
}
