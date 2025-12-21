import { useState } from "react";
import { paymentApi } from "../../api/paymentApi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/useCart";
import Spinner from "../../components/common/Spinner";
import { useOrders } from "../../context/useOrders";

export default function PaymentForm({ cart, total, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { addOrder } = useOrders();
  const { setCart, getDeliveryPrice, initiatDelivery} = useCart();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const paymentDetails = {
      cardName: formData.get("cardName"),
      idNumber: formData.get("idNumber"),
      cardNumber: formData.get("cardNumber"),
      expiry: formData.get("expiry"),
      cvv: formData.get("cvv"),
    };

    try {
      const res = await paymentApi.pay(cart, total, paymentDetails, getDeliveryPrice(), "creditCard");
      setPaymentSuccess(true);
      if (onSuccess) onSuccess(res.data);
      initiatDelivery(false);
      setTimeout(() => {
        addOrder(res.data.order);
        navigate("/orders");
        setCart([]);
      }, 2000);
    } catch (err) {
      const message =
      err.response?.data?.error ||
      err.response?.data?.message ||
      err.message ||
      "שגיאה בתשלום, נסה שוב";
     setError(message);
      
      // alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>פרטי תשלום</h3>

      <input type="text" name="cardName" placeholder="שם על הכרטיס" required className="form-control" style={{ marginBottom: "10px" }} />
      <input type="text" name="idNumber" placeholder="מספר תעודת זהות" required maxLength={10} className="form-control" style={{ marginBottom: "10px" }} />
      <input type="text" name="cardNumber" placeholder="מספר כרטיס" required maxLength={16} className="form-control" style={{ marginBottom: "10px" }} />
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input type="text" name="expiry" placeholder="MM/YY" required maxLength={5} className="form-control" />
        <input type="text" name="cvv" placeholder="CVV" required maxLength={3} className="form-control" />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "#ffa500aa" : "orange",
          color: "#fff",
          borderRadius: "5px",
          width: "100%",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.3s",
        }}
      >
        {loading && !paymentSuccess && <Spinner size={18} color="#fff" />}
        {paymentSuccess
          ? "תשלום בוצע בהצלחה ✅"
          : loading
          ? "מעבד..."
          : `שלם עכשיו (${total} ₪)`}
      </button>
            {error && (
              <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
              {error} - עליך להתחבר למערכת כדי לבצע תשלום
        </p>
      )}
    </form>
  );
}