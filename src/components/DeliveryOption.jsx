import { useCart } from "../context/useCart";

export default function DeliveryOption() {
  const { delivery, toggleDelivery, getDeliveryPrice } = useCart();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        marginTop: "20px",
        marginBottom: "20px",
        maxWidth: "400px",
        marginInline: "auto",
      }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        <input
          type="checkbox"
          checked={delivery}
          onChange={(e) => toggleDelivery(e.target.checked)}
          style={{ transform: "scale(1.2)" }}
        />
        <span style={{ fontSize: "1.3rem" }}>🚚</span>
        משלוח
      </label>

      <span style={{ fontWeight: "700", color: "#2e7d32" }}>
        ₪{getDeliveryPrice()}
      </span>
    </div>
  );
}