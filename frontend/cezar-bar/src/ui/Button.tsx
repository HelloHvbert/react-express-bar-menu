type ButtonProps = {
  text: string;
  type: "primary" | "delete" | "secondary" | "round" | "clear";
  onClick:
    | (() => void)
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
};

export default function Button({ text, type, onClick }: ButtonProps) {
  let style: string = "";
  if (type === "primary")
    style =
      "rounded bg-yellow-400 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-yellow-600 active:border-gray-100";
  else if (type === "delete")
    style =
      "bg-red-400 hover:bg-red-500 mt-6 rounded  px-10 py-2 text-lg text-white  focus:outline-none";
  else if (type === "secondary")
    style =
      " mt-6 rounded bg-yellow-400 px-10  py-2 text-lg text-white hover:bg-yellow-500  focus:outline-none";
  else if (type === "round")
    // style =
    // "inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-2.5 py-1 md:px-3.5 md:py-2 text-sm";
    style =
      "h-8 w-8 rounded-md border-2 border-gray-300 bg-yellow-400 hover:border-gray-500 focus:outline-none active:bg-yellow-200";
  else if (type === "clear")
    style =
      "rounded bg-gray-400 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-yellow-600";
  else
    style =
      "rounded bg-yellow-500 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-yellow-600";

  return (
    <button className={style} onClick={onClick}>
      {text}
    </button>
  );
}
