import { useLoaderData } from "react-router-dom";
import { Beer } from ".././data.ts";
import MenuItem from "./MenuItem.tsx";
import { memo } from "react";

function Menu() {
  const beers: Beer[] = useLoaderData() as Beer[];
  return (
    <div className=" border-5 mx-auto flex w-[80%] max-w-5xl flex-wrap items-center justify-center gap-2">
      {beers.map((beer: Beer) => (
        <MenuItem key={beer.id} beer={beer} />
      ))}
    </div>
  );
}

const MenuComponent = memo(Menu);
export default MenuComponent;
