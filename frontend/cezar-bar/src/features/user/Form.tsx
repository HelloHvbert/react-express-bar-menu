import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useActionData, Form as RouterForm } from "react-router-dom";
import { getFullCart } from "../cart/cartSlice";
import { useNavigate, useNavigation } from "react-router";
import LinkButton from "../../ui/LinkButton";

type ErrorsType = {
  name: string;
  email: string;
  table: string;
};

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [table, setTable] = useState<number | null>();
  const cart = useSelector(getFullCart);
  const errors: ErrorsType = useActionData() as ErrorsType;
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (cart.cart.length === 0) {
      navigate("/");
    }
  }, []);

  return (
    <div className="px-4 py-6">
      <LinkButton to="-1"> &larr; Go back</LinkButton>
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>
      <RouterForm method="post">
        <div
          className={`${
            errors?.name ? "mb-2" : "mb-5"
          } flex flex-col gap-2 sm:flex-row sm:items-center`}
        >
          <label className="sm:basis-40" htmlFor="name">
            First Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="input grow rounded-lg border-2 border-gray-300 pl-1 active:border-black"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        {errors?.name && (
          <div className="mb-2 pl-1 text-xs italic text-red-600">
            {errors.name}
          </div>
        )}
        <div
          className={`${
            errors?.name ? "mb-2" : "mb-5"
          } flex flex-col gap-2 sm:flex-row sm:items-center`}
        >
          <label className="sm:basis-40" htmlFor="email">
            Email address
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="input grow rounded-lg border-2 border-gray-300 pl-1 active:border-black"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        {errors?.email && (
          <div className="mb-2 pl-1 text-xs italic text-red-600">
            {errors.email}
          </div>
        )}
        <div
          className={`${
            errors?.name ? "mb-2" : "mb-5"
          } flex flex-col gap-2 sm:flex-row sm:items-center`}
        >
          <label className="sm:basis-40" htmlFor="table">
            Table number
          </label>
          <input
            type="number"
            name="table"
            id="table"
            className="input grow rounded-lg border-2 border-gray-300 pl-1 active:border-black"
            value={table || ""}
            onChange={(e) => {
              setTable(+e.target.value);
            }}
            min={1}
          />
        </div>
        {errors?.table && (
          <div className="mb-2 pl-1 text-xs italic text-red-600">
            {errors.table}
          </div>
        )}
        <input type="hidden" value={JSON.stringify(cart)} name="cart" />
        <div className="flex justify-center">
          <button
            disabled={isSubmitting}
            className="rounded bg-yellow-500 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-yellow-600"
          >
            {isSubmitting ? "Placing order..." : "Order"}
          </button>
        </div>
      </RouterForm>
    </div>
  );
}
