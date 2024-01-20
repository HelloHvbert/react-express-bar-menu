import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import store from "../store";
import { clearCart } from "../features/cart/cartSlice";
import { API_URL } from "./apiMenu";

function isEmailAddress(email: string) {
  const validateEmailRegex = /^\S+@\S+\.\S+$/;
  return validateEmailRegex.test(email);
}

// Create new order
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const { name, email, table } = data;
  const errors = { name: "", email: "", table: "" };

  if (!name) {
    errors.name = " Don't forget to enter your first name";
  }

  if (!isEmailAddress(email as string)) {
    errors.email = " Please enter a valid email address";
  } else if (!email) {
    errors.email = " Don't forget to enter your email address";
  }

  if (!table) {
    errors.table = " Don't forget to enter your table number";
  }

  if (errors.name || errors.email || errors.table) {
    return errors;
  }
  const cart = JSON.parse(data.cart.toString());

  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      customerName: name,
      email: email,
      tableNumber: +table,
      beers: cart.cart,
      totalPrice: cart.totalPrice,
    }),
  });
  const resData = await res.json();
  if (resData.orderId) {
    const { orderId }: { orderId: number } = resData;
    store.dispatch(clearCart());
    return redirect(`/order/${orderId}`);
  } else {
    throw new Error("Failed to create order");
  }
}

export async function orderLoader(
  args: LoaderFunctionArgs<unknown>,
): Promise<null> {
  return new Promise<null>((resolve) => {
    setTimeout(async () => {
      const { params } = args;
      const id = Number(params.id);
      const order = await fetch(`${API_URL}/orders/${id}`);
      if (order.status !== 200) {
        throw new Error("Order not found");
      }
      const data = await order.json();
      resolve(data);
    }, 200);
  });
}
