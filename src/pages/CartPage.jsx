import Cart from "../components/Cart";
import { useCart } from "../context/useCart";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, updateNote } = useCart();

  return (
    <Cart
      cartItems={cart}
      onIncrease={(id) =>
        updateQuantity(id, cart.find((item) => item.id === id).quantity + 1)
      }
      onDecrease={(id) =>
        updateQuantity(id, cart.find((item) => item.id === id).quantity - 1)
      }
      onRemove={removeFromCart}
      onNoteChange={updateNote}
    />
  );
}