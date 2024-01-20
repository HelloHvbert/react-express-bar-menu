import { useLoaderData, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCart, removeItem } from "../cart/cartSlice";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import NavigateBack from "../../ui/NavigateBack";
import Button from "../../ui/Button";
import ExtraInfo from "./ExtraInfo";
import Descriptions from "./Descriptions";
import { Beer } from "../data";

/*
export interface Beer {
  id: number;
  name: string;
  tagline: string;
  description: string;
  abv: number;
  image_url: string;
}
*/

export default function ItemPreview() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const isInCart = cart.some((item) => item.id === Number(id));
  const inCartQuantity = cart.find((item) => item.id === Number(id))?.quantity;

  const {
    name,
    tagline,
    description,
    image_url,
    food_pairing,
    abv,
    ph,
    ibu,
    ebc,
    srm,
    vol,
    price,
    ingredients,
  }: Beer = useLoaderData() as Beer;

  const malt = ingredients?.malt.map((malt) => malt.name);

  useEffect(() => {
    if (inCartQuantity) setQuantity(inCartQuantity);
  }, [inCartQuantity]);

  function handleAdd() {
    setQuantity(quantity + 1);
  }
  function handleSubtract() {
    if (quantity > 1) setQuantity(quantity - 1);
  }

  return (
    <div className="container mx-auto mt-10 rounded-md p-2">
      <NavigateBack />
      <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:space-x-8">
        <div className="flex flex-col items-center md:items-start">
          <div className="rounded-lg bg-white py-4 shadow-lg">
            <img
              src={image_url} // Replace with your image url variable
              alt={name} // Replace with your product name variable
              className="m-auto h-40 w-40 object-contain md:h-64 md:w-64" // Adjusted for proper scaling
            />
          </div>
        </div>

        <div className="mt-6 md:mt-0 md:space-y-5">
          <h1 className=" w-fit text-center text-3xl font-bold text-gray-700">
            {name}
            <p className="text-sm">{tagline}</p>
          </h1>
          <div className=" flex flex-col items-center text-center">
            <p className="text-xl font-semibold text-gray-600">
              {price.toFixed(2)} zł
            </p>
            {inCartQuantity ? (
              <div className="mt-4 flex items-center sm:justify-center md:justify-start">
                <UpdateItemQuantity
                  beerId={Number(id)}
                  currentQuantity={quantity}
                />
              </div>
            ) : (
              <div className="mt-4 flex items-center sm:justify-center md:justify-start">
                <UpdateItemQuantity
                  beerId={Number(id)}
                  currentQuantity={quantity}
                  onAdd={handleAdd}
                  onRemove={handleSubtract}
                />
              </div>
            )}
            {/* Delete item form cart button */}
            {isInCart ? (
              <Button
                text="Remove"
                type="delete"
                onClick={() => dispatch(removeItem({ id: Number(id) }))}
              />
            ) : (
              <Button
                text="Add to cart"
                type="secondary"
                onClick={() => {
                  const num = Number(id);
                  dispatch(
                    addToCart({
                      id: num,
                      name,
                      quantity,
                      price,
                      totalPrice: price * quantity,
                    }),
                  );
                }}
              />
            )}
          </div>
          <div className="flex justify-around">
            <ExtraInfo
              abv={abv}
              ph={ph}
              ibu={ibu}
              ebc={ebc}
              srm={srm}
              vol={vol}
            />
          </div>
        </div>
      </div>

      <Descriptions
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        description={description}
        foodPairing={food_pairing}
        ingredients={malt?.join(", ")}
      />
    </div>
  );
}
