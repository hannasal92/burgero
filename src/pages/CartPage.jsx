import Cart from "../components/Cart";
import { useCart } from "../context/useCart";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, updateNote } = useCart();

  return (
    <Cart
      cartItems={cart}
      onIncrease={(cartId) =>
        updateQuantity(cartId, cart.find((item) => item.cartId === cartId).quantity + 1)
      }
      onDecrease={(cartId) =>
        updateQuantity(cartId, cart.find((item) => item.cartId === cartId).quantity - 1)
      }
      onRemove={removeFromCart}
      onNoteChange={updateNote}
    />
  );
}