import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Loader from "./Loader";
import ScrollToTop from "./ScrollToTop";
// import CartOverview from "../features/cart/CartOverview";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex min-h-screen flex-col bg-yellow-50">
        <ScrollToTop />

        <Header />
        <div className="m-auto flex w-10/12 items-center  justify-center py-3">
          <Outlet />
        </div>
        {/* <CartOverview /> */}
      </div>
    </>
  );
}
