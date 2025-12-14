import { useState } from "react";
import Cart from "../components/Cart";
import { useCart } from "../context/useCart";
import Modal from "../components/common/Modal";
import PaymentForm from "../components/common/PaymentForm";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, updateNote, updateAddition, calculateCartTotal} = useCart();
  //const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [showPayment, setShowPayment] = useState(false);

  const handlePayClick = () => {
    if (cart.length === 0) {
      alert("העגלה ריקה! אנא הוסף מוצרים לפני התשלום.");
      return;
    }
    console.log(cart)
    setShowPayment(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // alert("תודה! התשלום בוצע בהצלחה.");
    setShowPayment(false);
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
        onAddAddition={updateAddition} // <-- pass it here

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

      {/* Modal */}
      <Modal show={showPayment} onClose={() => setShowPayment(false)}>
        <PaymentForm total={calculateCartTotal()} cart={cart} onSubmit={handlePaymentSubmit} />
      </Modal>
    </div>
  );
}