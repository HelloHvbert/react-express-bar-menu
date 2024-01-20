import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { CartItem as Props } from "./cartSlice";

type CartItemProps = {
  item: Props;
};

export default function CartItem({ item: item }: CartItemProps) {
  const { name, quantity, totalPrice, id } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="px-3 text-sm font-bold">{totalPrice.toFixed(2)} zł</p>
        <UpdateItemQuantity beerId={id} currentQuantity={quantity} />
        <DeleteItem id={id} />
      </div>
    </li>
  );
}
