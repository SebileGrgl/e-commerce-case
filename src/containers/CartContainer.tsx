import CartItem from "../components/CartItem";
import { useCart } from "../hooks/useCart";

const CartContainer: React.FC = () => {
  const { cartItems } = useCart();

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id}>
          <CartItem cartItem={item} />
        </div>
      ))}
    </div>
  );
};

export default CartContainer;
