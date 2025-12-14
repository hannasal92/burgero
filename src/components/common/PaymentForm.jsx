import { useState } from "react";
import { paymentApi } from "../../api/paymentApi";

export default function PaymentForm({ cart, total, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Gather form data
    const formData = new FormData(e.target);
    const paymentDetails = {
      cardName: formData.get("cardName"),
      idNumber: formData.get("idNumber"),
      cardNumber: formData.get("cardNumber"),
      expiry: formData.get("expiry"),
      cvv: formData.get("cvv"),
    };

    try {
      // Send cart, total, and payment details to backend
      const res = await paymentApi.pay(cart, total, paymentDetails);
      console.log("Payment success:", res.data);
      if (onSuccess) onSuccess(res.data); // callback after successful payment
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>פרטי תשלום</h3>

      <input
        type="text"
        name="cardName"
        placeholder="שם על הכרטיס"
        required
        className="form-control"
        style={{ marginBottom: "10px" }}
      />
      <input
        type="text"
        name="idNumber"
        placeholder="מספר תעודת זהות"
        required
        maxLength={10}
        className="form-control"
        style={{ marginBottom: "10px" }}
      />
      <input
        type="text"
        name="cardNumber"
        placeholder="מספר כרטיס"
        required
        maxLength={16}
        className="form-control"
        style={{ marginBottom: "10px" }}
      />
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          name="expiry"
          placeholder="MM/YY"
          required
          maxLength={5}
          className="form-control"
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          required
          maxLength={3}
          className="form-control"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: "orange",
          color: "#fff",
          borderRadius: "5px",
          width: "100%",
          fontWeight: "bold",
        }}
      >
        {loading ? "מעבד..." : `שלם עכשיו (${total} ₪)`}
      </button>
    </form>
  );
}