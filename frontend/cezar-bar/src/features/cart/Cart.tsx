import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import { useNavigate } from "react-router";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(getCart);

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 font-sans text-xl">Your cart</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button
          type="primary"
          text="Order"
          onClick={() => navigate("/order/new")}
        />

        <Button
          type="clear"
          onClick={() => dispatch(clearCart())}
          text="Clear cart"
        />
      </div>
    </div>
  );
}
