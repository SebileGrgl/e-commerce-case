import { CartItemProps } from "../utils/types";

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  return (
    <div className="flex justify-between gap-14 bg-white p-5 shadow-md">
      <div>
        <p className="font-thin"> {cartItem.model}</p>
        <p className="text-blue font-thin">{cartItem.price}</p>
      </div>
      <div className="flex">
        <div className="w-8 py-2 bg-gray-200 rounded flex justify-center items-center font-bold">
          -
        </div>
        <div className="w-8 py-2 bg-blue text-white rounded flex justify-center items-center font-bold">
          {" "}
          {cartItem.quantity}
        </div>
        <div className="w-8 py-2 bg-gray-200 rounded flex justify-center items-center font-bold">
          +
        </div>
      </div>
    </div>
  );
};

export default CartItem;
