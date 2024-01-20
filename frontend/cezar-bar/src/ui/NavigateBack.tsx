import { useNavigate } from "react-router";

export default function NavigateBack() {
  const navigate = useNavigate();
  function handleClick() {
    navigate(-1);
  }
  return (
    <div
      className=" absolute left-[42%] top-[10%] z-10 cursor-pointer text-center font-semibold uppercase underline hover:text-gray-500 md:left-[46%]"
      onClick={handleClick}
    >
      go back
    </div>
  );
}
