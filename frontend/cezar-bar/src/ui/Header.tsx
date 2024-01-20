import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getTotalPrice } from "../features/cart/cartSlice";

export default function Header() {
  const { pathname } = useLocation();
  const isCart = pathname === "/cart";
  const totalPrice = useSelector(getTotalPrice);
  return (
    <div className="sm:text-md mb-3 flex items-center justify-between space-x-5  bg-yellow-400 px-5 py-3 text-xl uppercase sm:px-6">
      <Link to="/">
        <span className="font-semibold tracking-widest">Cezar Bar</span>
      </Link>
      <div className=" space-x-3">
        {/* <span>Reserve</span> */}
        {totalPrice !== 0 && !isCart && (
          <Link to="/cart">
            <span className=" cursor-pointer">
              {`🛒 ${totalPrice.toFixed(2)}`} zł
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
