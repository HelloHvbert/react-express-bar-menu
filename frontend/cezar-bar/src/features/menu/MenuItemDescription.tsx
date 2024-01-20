interface MenuItemDescriptionProps {
  description: string;
  abv: number;
  price: number;
}

export default function MenuItemDescription({
  description,
  abv,
  price,
}: MenuItemDescriptionProps) {
  return (
    <span className="select-none">
      <p className="text-md font-semibold underline underline-offset-2">
        Description
      </p>
      <span className="w-53 mt-2  flex h-80 flex-wrap text-center text-sm">
        {description.length > 150
          ? description.substring(0, 150) + "..."
          : description}
        <h3 className="mx-auto">
          <p>
            <span className="font-bold">ABV: </span>
            {abv}%
          </p>
          <p>
            <span className="font-bold">Price: </span>
            {price} zł
          </p>
        </h3>
      </span>
    </span>
  );
}
