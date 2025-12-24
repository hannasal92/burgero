import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();
const DELIVERY_PRICE = 15;

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [delivery, setDelivery] = useState(false);
  const addToCart = (item) => {
    const uniqueItem = {
      ...item,
      cartId: item._id,
      quantity: 1,
      selectedAdditions: [],
      note: "",
      payType : "cash"
    };

    const itemWithTotal = {
      ...uniqueItem,
      totalPrice: calculateItemTotal(uniqueItem),
    };

    setCart((prev) => [...prev, itemWithTotal]);
  };

  // const removeFromCart = (cartId) => {
  //   setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  //   console.log(cart);
  // };
  const removeFromCart = (cartId) => {
      setCart((prev) => {
        const updatedCart = prev.filter((item) => item.cartId !== cartId);

        if (updatedCart.length === 0) {
          setDelivery(false)
        }

        return updatedCart;
      });
    };
  const updateQuantity = (cartId, quantity) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.cartId !== cartId) return item;

        const updatedItem = { ...item, quantity };

        return {
          ...updatedItem,
          totalPrice: calculateItemTotal(updatedItem),
        };
      })
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

      // Update available additions (for UI state)
      const newAdditions = item.additions?.map((a) =>
        a.name === additionName ? { ...a, selected } : a
      );

      let updatedAdditions;

      if (selected) {
        // ADD (prevent duplicates)
        updatedAdditions = item.selectedAdditions.some(
          (a) => a.name === additionName
        )
          ? item.selectedAdditions
          : [...item.selectedAdditions, { name: additionName, price }];
      } else {
        // REMOVE
        updatedAdditions = item.selectedAdditions.filter(
          (a) => a.name !== additionName
        );
      }

      const updatedItem = {
        ...item,
        additions: newAdditions,
        selectedAdditions: updatedAdditions,
      };

      return {
        ...updatedItem,
        totalPrice: calculateItemTotal(updatedItem),
      };
    })
  );
};
  const toggleDelivery = (value) => {
    setDelivery(value);
  };
  const resetCart = () =>{
    setDelivery(false);
    setCart([])
  }
  const getDeliveryPrice = () => {
    return delivery ? DELIVERY_PRICE : 0;
  };
  const calculateItemTotal = (item) => {
  const additionsTotal = item.selectedAdditions.reduce(
    (sum, a) => sum + a.price,
    0
  );

    return (item.price + additionsTotal) * item.quantity;
  };
  const calculateCartTotal = () => {
  const ItemTotal = cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  return ItemTotal + getDeliveryPrice();
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, updateQuantity, updateNote, updateAddition, getTotal, calculateCartTotal, calculateItemTotal, toggleDelivery, getDeliveryPrice, resetCart, delivery }}
    >
      {children}
    </CartContext.Provider>
  );
}