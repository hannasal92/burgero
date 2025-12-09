export default function PaymentForm({ total, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>פרטי תשלום</h3>

      <div style={{ marginBottom: "10px" }}>
        <label>שם בעל הכרטיס</label>
        <input
          type="text"
          required
          className="form-control"
          placeholder="שם על הכרטיס"
        />
      </div>


      <div style={{ marginBottom: "10px" }}>
        <label>מספר תעודת זהות </label>
        <input
          type="text"
          required
          className="form-control"
          placeholder="123456789"
          maxLength={10} // adjust as needed
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>מספר כרטיס</label>
        <input
          type="text"
          required
          className="form-control"
          placeholder="1234 5678 9012 3456"
          maxLength={16}
        />
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <div style={{ flex: 1 }}>
          <label>תוקף</label>
          <input
            type="text"
            required
            className="form-control"
            placeholder="MM/YY"
            maxLength={5}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label>CVV</label>
          <input
            type="text"
            required
            className="form-control"
            placeholder="123"
            maxLength={3}
          />
        </div>
      </div>

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "orange",
          color: "#fff",
          borderRadius: "5px",
          width: "100%",
          fontWeight: "bold",
        }}
      >
        שלם עכשיו ({total} ₪)
      </button>
    </form>
  );
}