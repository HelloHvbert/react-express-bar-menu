import { useDispatch } from "react-redux";
// import Button from "../../ui/Button";
import { removeItem } from "./cartSlice";

function DeleteItem({ id }: { id: number }) {
  const dispatch = useDispatch();
  return (
    <button
      className="text-black-300 h-8 w-8 rounded-md border-2 border-gray-400 bg-red-600 font-bold hover:border-gray-500 focus:outline-none active:bg-red-400"
      onClick={() => dispatch(removeItem({ id: Number(id) }))}
    >
      X
    </button>
  );
}

export default DeleteItem;
