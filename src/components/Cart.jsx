import { useCart } from "../context/useCart";
import { Link } from "react-router-dom";
import DeliveryOption from "./DeliveryOption";
export default function Cart({
  cartItems = [],
  onIncrease,
  onDecrease,
  onRemove,
  onNoteChange,
  onAddAddition, // new prop
}) {
    const { calculateItemTotal, calculateCartTotal} = useCart();
  
  return (
    <div className="cart-page">
      <h2 className="cart-title">העגלה שלי</h2>
      {cartItems.length === 0 ? (
        
        <div
          style={{
            maxWidth: "520px",
            margin: "auto",
            background: "#fff",
            borderRadius: "18px",
            padding: "70px 30px",
            textAlign: "center",
            boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
            animation: "fadeIn 0.6s ease",
          }}
        >
          {/* ICON */}
          <div
            style={{
              fontSize: "4rem",
              marginBottom: "20px",
              animation: "bounce 1.5s infinite",
            }}
          >
            🛒
          </div>

          <h3 style={{ marginBottom: "10px", fontWeight: "800" }}>
            העגלה ריקה
          </h3>

          <p style={{ color: "#777", fontSize: "0.95rem", marginBottom: "25px" }}>
            עדיין לא הוספת מוצרים לעגלה
          </p>

          {/* CTA BUTTON */}
          <Link
            to="/menu"
            style={{
              display: "inline-block",
              background: "orange",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "30px",
              padding: "12px 28px",
              fontSize: "1rem",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 6px 15px rgba(255,152,0,0.35)",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            🍔 חזרה לתפריט
          </Link>
        </div>
      ) : (
        <>
          <DeliveryOption />

          <div className="cart-list">
            {cartItems.map((item) => {
              // const additionsTotal = item.additions?.reduce((sum, a) => sum + (a.selected ? a.price : 0), 0) || 0;
              // const itemTotal = (item.price + additionsTotal) * item.quantity;

              return (
                <div
                  className="cart-item"
                  key={item.cartId}
                  style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}
                >
                  <img src={`/images/${item.image}`} alt={item.name} className="cart-img" />

                  <div className="cart-details">
                    <h4 className="cart-name">{item.name}</h4>
                    <p className="cart-desc">{item.description}</p>
                    <p className="cart-price">מחיר למוצר: {item.price} ₪</p>

                    {/* QUANTITY */}
                    <div className="quantity-box">
                      <button onClick={() => onDecrease(item.cartId)} disabled={item.quantity === 1}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onIncrease(item.cartId)}>+</button>
                    </div>

                    {/* ADDITIONS CHECKBOXES */}
                    {item.additions?.length > 0 && (
                      <div className="additions" style={{ marginTop: "10px" }}>
                        <strong>תוספות:</strong>
                        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                          {item.additions.map((a, idx) => (
                            <label key={idx}>
                              <input
                                type="checkbox"
                                checked={a.selected || false}
                                onChange={(e) =>
                                  onAddAddition(item.cartId, a.name, a.price, e.target.checked)
                                }
                                style={{ margin: "5px" }}
                              />
                              {a.name} (+₪{a.price})
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* NOTES */}
                    <textarea
                      className="note-textarea"
                      placeholder="הערות למנה (הוספות/הורדות)"
                      value={item.note || ""}
                      onChange={(e) => onNoteChange(item.cartId, e.target.value)}
                      style={{ marginTop: "10px", width: "100%" }}
                    ></textarea>

                    <div style={{ fontWeight: "bold", marginTop: "10px" }}>
                      סכ״ה: ₪{calculateItemTotal(item)}
                    </div>
                  </div>

                  <button className="remove-btn" onClick={() => onRemove(item.cartId)}>
                    ✖
                  </button>
                </div>
              );
            })}
          </div>

          <div className="cart-total" style={{ marginTop: "20px", fontWeight: "bold", textAlign: "right" }}>
            סכום כולל: ₪{calculateCartTotal()}
          </div>
        </>
      )}
    </div>
  );
}