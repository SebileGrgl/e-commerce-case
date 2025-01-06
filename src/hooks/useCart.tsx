import { useContext } from "react";
import { CartContextType } from "../utils/types";
import { CartContext } from "../contexts/CartContext";

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
