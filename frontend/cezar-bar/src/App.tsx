import {
  LoaderFunction,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error.tsx";

import Menu from "./features/menu/Menu";
import ItemPreview from "./features/menu/ItemPreview";
import Form from "./features/user/Form";
import Order from "./features/user/Order";
import Cart from "./features/cart/Cart";
import { Beer } from "./features/data.ts";

import { orderLoader } from "./services/apiOrder.ts";
import { action as newOrderAction } from "./services/apiOrder.ts";
import { getMenu as MenuLoader, beerLoader } from "./services/apiMenu.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Menu />,
        loader: MenuLoader,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "menu/:id",
        element: <ItemPreview />,
        loader: beerLoader as LoaderFunction<Beer>,
      },
      {
        path: "order/new",
        element: <Form />,
        action: newOrderAction,
      },
      {
        path: "order/:id",
        element: <Order />,
        loader: orderLoader,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
