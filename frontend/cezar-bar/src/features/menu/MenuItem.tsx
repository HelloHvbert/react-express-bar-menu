import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCart } from "../cart/cartSlice";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import MenuItemDescription from "./MenuItemDescription";
import Button from "../../ui/Button";
import { Beer } from "../data";

interface MenuItemProps {
  beer: Beer;
}

export default function MenuItem({ beer }: MenuItemProps) {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const [descriptionEnabled, setDescriptionEnabled] = useState<boolean>(false);
  const { id, name, price } = beer;
  const isInCart = cart.some((item) => item.id === beer.id);
  const quantity = cart.find((item) => item.id === beer.id)?.quantity || 1;

  //TODO fetch price

  function handleOrder(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    dispatch(
      addToCart({
        id,
        name,
        quantity,
        price: price,
        totalPrice: quantity * price,
      }),
    );
  }

  return (
    <>
      <div className=" flex h-80 w-80 flex-col items-center rounded-md border-2 border-gray-500 bg-white px-2 pb-2">
        <div
          className="mt-1 h-80 cursor-pointer border-blue-100 text-center"
          onMouseEnter={() => setDescriptionEnabled(true)}
          onMouseLeave={() => setDescriptionEnabled(false)}
        >
          <Link to={`/menu/${beer.id}`}>
            {descriptionEnabled ? (
              <MenuItemDescription
                description={beer.description}
                abv={beer.abv}
                price={beer.price}
              />
            ) : (
              <img
                className="h-[220px] w-[80px] rounded-lg"
                src={beer.image_url}
                alt={beer.name}
              />
            )}
          </Link>
        </div>

        {!descriptionEnabled && (
          <>
            <div className="flex flex-col flex-wrap py-2 text-center text-sm font-semibold">
              <p>{beer.name}</p>
            </div>

            {isInCart ? (
              <UpdateItemQuantity beerId={id} currentQuantity={quantity || 1} />
            ) : (
              <Button text="Order" type="primary" onClick={handleOrder} />
            )}
          </>
        )}
      </div>
    </>
  );
}
