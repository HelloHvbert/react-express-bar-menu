import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { changeQuantity } from "./cartSlice";

type UpdateItemQuantityProps = {
  beerId: number;
  currentQuantity: number;
  onAdd?: () => void;
  onRemove?: () => void;
};

function UpdateItemQuantity({
  beerId,
  currentQuantity,
  onAdd,
  onRemove,
}: UpdateItemQuantityProps) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1 md:gap-3">
      {onAdd && onRemove ? (
        <>
          <Button type="round" onClick={onRemove} text="-" />

          <span className="text-lg font-bold">{currentQuantity}</span>

          <Button type="round" onClick={onAdd} text="+" />
        </>
      ) : (
        <>
          <Button
            type="round"
            onClick={() =>
              dispatch(changeQuantity({ id: beerId, payload: -1 }))
            }
            text="-"
          />

          <span className="text-lg font-bold">{currentQuantity}</span>

          <Button
            type="round"
            onClick={() => dispatch(changeQuantity({ id: beerId, payload: 1 }))}
            text="+"
          />
        </>
      )}
    </div>
  );
}

export default UpdateItemQuantity;
