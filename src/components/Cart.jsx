import { useCart } from "../context/useCart";

export default function Cart({
  cartItems = [],
  onIncrease,
  onDecrease,
  onRemove,
  onNoteChange,
  onAddAddition, // new prop
}) {
    const { calculateItemTotal} = useCart();
  
  return (
    <div className="cart-page">
      <h2 className="cart-title">העגלה שלי</h2>

      {cartItems.length === 0 ? (
        <p className="empty-text">העגלה ריקה</p>
      ) : (
        <>
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
                  <img src={`../src/images/${item.image}`} alt={item.name} className="cart-img" />

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
            סכום כולל: ₪{cartItems.reduce((sum, item) => {
              const additionsTotal = item.additions?.reduce((aSum, a) => aSum + (a.selected ? a.price : 0), 0) || 0;
              return sum + (item.price + additionsTotal) * item.quantity;
            }, 0)}
          </div>
        </>
      )}
    </div>
  );
}