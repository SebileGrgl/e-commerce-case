import { createContext, useEffect, useState } from "react";
import { CartContextType, CartItem, ProductType } from "../utils/types";
import useLocalStorage from "../hooks/useLocalStorage";

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [storedItems, setStoredItems] = useLocalStorage<CartItem[]>(
    "cartItems",
    []
  );
  const [cartItems, setCartItems] = useState<CartItem[]>(
    storedItems ? storedItems : []
  );

  useEffect(() => {
    setStoredItems(cartItems);
  }, [cartItems]);

  const addToCart = (product: ProductType) => {
    setCartItems((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  const increaseQuantity = (productId: string) => {
    setCartItems((prevCart) => {
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  const decreaseQuantity = (productId: string) => {
    setCartItems((prevCart) => {
      return prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalPrice,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
