import { useLoaderData } from "react-router";
import OrderItem from "./OrderItem";
import { CartItem } from "../cart/cartSlice";

type LoaderDataTypes = {
  id: number;
  totalPrice: number;
  tableNumber: number;
  beers: CartItem[];
  orderTime: string;
};

function Order() {
  const { id, tableNumber, beers, orderTime, totalPrice }: LoaderDataTypes =
    useLoaderData() as LoaderDataTypes;
  const isCompleted = isDelivered(orderTime);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-gray-800">
            {tableNumber}
            <sup>
              {tableNumber === 1
                ? "st"
                : tableNumber === 2
                  ? "nd"
                  : tableNumber === 3
                    ? "rd"
                    : "th"}
            </sup>{" "}
            table
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-yellow-100 px-6 py-5">
        {isCompleted ? (
          <>
            <p className="text-sm font-semibold">
              The order should have already been delivered.
            </p>
            <p className="text-md">Cheers!🍻</p>
          </>
        ) : (
          <>
            <p className="font-semibold">Only 10 minutes left 😃</p>
            <p className="text-sm">
              (Estimated delivery: {getDeliveryTime(orderTime)})
            </p>
          </>
        )}
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {beers.map((item: CartItem) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-800">
          <span className="font-semibold">Total price:</span>{" "}
          {totalPrice.toFixed(2)} zł
        </p>
      </div>
    </div>
  );
}

export function calcMinutesLeft(dateStr: string) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}

export function formatCurrency(value: number) {
  return `${value.toFixed(2)} zł`;
}

function getDeliveryTime(date: string) {
  const dateCopy = new Date(date);
  dateCopy.setMinutes(dateCopy.getMinutes() + 10);
  return dateCopy.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isDelivered(date: string): boolean {
  const dateCopy = new Date(date);
  const now = new Date();
  dateCopy.setMinutes(dateCopy.getMinutes() + 10);
  return now > dateCopy;
}

export default Order;
