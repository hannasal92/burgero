import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const uniqueItem = {
      ...item,
      cartId: crypto.randomUUID(), // unique id for this cart entry
      quantity: 1,
      note: "",
    };
    setCart((prev) => [...prev, uniqueItem]);
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, quantity } : item
      )
    );
  };

  const updateNote = (cartId, note) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, note } : item
      )
    );
  };
  const updateAddition = (cartId, additionName, price, selected) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.cartId !== cartId) return item;

        // If item has additions
        const newAdditions = item.additions?.map((a) =>
          a.name === additionName ? { ...a, selected } : a
        );

        return { ...item, additions: newAdditions };
      })
    );
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, updateNote, updateAddition, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}