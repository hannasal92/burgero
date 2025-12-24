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
  const { setCart, getDeliveryPrice, resetCart} = useCart();
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
      resetCart();
      setTimeout(() => {
        addOrder(res.data.order);
        navigate("/orders");
        setCart([]);
      }, 2000);
      } catch (err) {
        let message = "שגיאה בתשלום, נסה שוב";

        if (err.response) {
          // Server responded
          if (err.response.status === 403) {
            message = err.response.data?.message || "אין הרשאה לבצע פעולה זו";
          } 
          else if(err.response.status === 401) {
            message = err.response.data?.message || "אין הרשאה לבצע פעולה זו";
                  setTimeout(() => {
                  navigate("/login");
                }, 2000);
          }
          else {
            message = err.response.data?.error || err.response.data?.message || message;
          }
        } 
        else {
          // Something else
          message = err.message || message;
        }

        setError(message);
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
              {error}
        </p>
      )}
    </form>
  );
}