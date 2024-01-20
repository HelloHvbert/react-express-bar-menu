import { useNavigate } from "react-router";

export default function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div className="flex h-auto flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Your Cart is Empty
      </h2>
      <p className="mb-8 text-lg text-gray-600">
        Looks like you haven't added anything to your cart yet!
      </p>
      <button
        onClick={() => navigate("/")}
        className="rounded bg-yellow-500 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-yellow-600"
      >
        Go to menu
      </button>
    </div>
  );
}
