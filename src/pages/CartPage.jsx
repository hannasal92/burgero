import { useState } from "react";
import Cart from "../components/Cart";
import { useCart } from "../context/useCart";
import Modal from "../components/common/Modal";
import PaymentForm from "../components/common/PaymentForm";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, updateNote, updateAdditions } = useCart();
  
  // Calculate total including additions
  const total = cart.reduce((sum, item) => {
    const additionsTotal = item.additions?.reduce((aSum, a) => aSum + a.price, 0) || 0;
    return sum + (item.price + additionsTotal) * item.quantity;
  }, 0);

  const [showPayment, setShowPayment] = useState(false);

  const handlePayClick = () => {
    if (cart.length === 0) {
      alert("העגלה ריקה! אנא הוסף מוצרים לפני התשלום.");
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert("תודה! התשלום בוצע בהצלחה.");
    setShowPayment(false);
  };

  // Handle adding/removing additions
  const handleAddAddition = (cartId, name, price, checked) => {
    const item = cart.find(i => i.cartId === cartId);
    let newAdditions = item.additions ? [...item.additions] : [];

    if (checked) {
      newAdditions.push({ name, price });
    } else {
      newAdditions = newAdditions.filter(a => a.name !== name);
    }

    updateAdditions(cartId, newAdditions);
  };

  return (
    <div className="cart-page-container" style={{ padding: "20px", position: "relative" }}>
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
        onAddAddition={handleAddAddition} // NEW
      />

      {cart.length > 0 && (
        <div className="cart-actions" style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            className="checkout-btn"
            onClick={handlePayClick}
            style={{
              padding: "10px 20px",
              backgroundColor: "green",
              color: "#fff",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            מעבר לתשלום
          </button>
        </div>
      )}

      <Modal show={showPayment} onClose={() => setShowPayment(false)}>
        <PaymentForm total={total} onSubmit={handlePaymentSubmit} />
      </Modal>
    </div>
  );
}