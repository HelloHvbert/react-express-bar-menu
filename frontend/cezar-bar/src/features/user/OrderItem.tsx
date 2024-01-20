import { Link } from "react-router-dom";
import { CartItem } from "../cart/cartSlice";

type OrderItemProps = {
  item: CartItem;
};

// export interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   totalPrice: number;
// }

function OrderItem({ item }: OrderItemProps) {
  const { quantity, name, totalPrice, id } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span>{" "}
          <Link to={`/menu/${id}`}>{name}</Link>
        </p>
        <p className="font-bold">{totalPrice.toFixed(2)}</p>
      </div>
      {/* <p className="text-sm capitalize italic text-stone-500">
        {isLoadingIngredients ? "Loading..." : ingredients.join(", ")}
      </p> */}
    </li>
  );
}

export default OrderItem;
