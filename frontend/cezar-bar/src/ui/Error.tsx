import { useNavigate } from "react-router";
import Button from "./Button";

export default function Error() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-yellow-100 px-4">
      <h1 className="mb-4 text-4xl font-bold text-yellow-600">Oops!</h1>
      <p className="mb-8 text-lg text-gray-700">There was an error.😢</p>

      <Button text="Go Back" onClick={() => navigate("/")} type="primary" />
    </div>
  );
}
