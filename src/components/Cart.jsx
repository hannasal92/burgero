export default function Cart({
  cartItems = [],
  onIncrease,
  onDecrease,
  onRemove,
  onNoteChange,
  onAddAddition, // NEW
}) {

  return (
    <div className="cart-page">
      <h2 className="cart-title">העגלה שלי</h2>

      {cartItems.length === 0 ? (
        <p className="empty-text">העגלה ריקה</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => {
              const additionsTotal = item.additions?.reduce((sum, a) => sum + a.price, 0) || 0;
              const itemTotal = (item.price + additionsTotal) * item.quantity;

              return (
                <div className="cart-item" key={item.cartId} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}>
                  
                  <img src={`../src/images/${item.img}`} alt={item.name} className="cart-img" />

                  <div className="cart-details">
                    <h4 className="cart-name">{item.name}</h4>
                    <p className="cart-desc">{item.description}</p>
                    <p className="cart-price">Base: {item.price} ₪</p>

                    {/* QUANTITY */}
                    <div className="quantity-box">
                      <button onClick={() => onDecrease(item.cartId)} disabled={item.quantity === 1}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onIncrease(item.cartId)}>+</button>
                    </div>

                    {/* ADDITIONS */}
                    <div className="additions" style={{ marginTop: "10px" }}>
                      <label>
                        <input
                          type="checkbox"
                          checked={item.additions?.some(a => a.name === "Cheese")}
                          onChange={(e) => onAddAddition(item.cartId, "Cheese", 5, e.target.checked)}
                          style={{ margin: "5px" }}
                        />
                        Cheese (+₪5)
                      </label>
                      <label >
                        <input
                          type="checkbox"
                          checked={item.additions?.some(a => a.name === "Bacon")}
                          onChange={(e) => onAddAddition(item.cartId, "Bacon", 7, e.target.checked)}
                          style={{ margin: "5px" }}
                        />
                        Bacon (+₪7)
                      </label>
                      <label >
                        <input
                          type="checkbox"
                          checked={item.additions?.some(a => a.name === "Meat")}
                          onChange={(e) => onAddAddition(item.cartId, "Meat", 10, e.target.checked)}
                          style={{ margin: "5px" }}

                        />
                        Extra Meat (+₪10)
                      </label>
                    </div>

                    {/* TEXTAREA FOR NOTES */}
                    <textarea
                      className="note-textarea"
                      placeholder="הערות למנה (הוספות/הורדות)"
                      value={item.note || ""}
                      onChange={(e) => onNoteChange(item.cartId, e.target.value)}
                      style={{ marginTop: "10px", width: "100%" }}
                    ></textarea>

                    <div style={{ fontWeight: "bold", marginTop: "10px" }}>
                      Total: ₪{itemTotal}
                    </div>
                  </div>

                  <button className="remove-btn" onClick={() => onRemove(item.cartId)}>
                    ✖
                  </button>

                </div>
              );
            })}
          </div>

          <div className="cart-total">
            <h3>
              סכום כולל: ₪{cartItems.reduce((sum, item) => {
                const additionsTotal = item.additions?.reduce((aSum, a) => aSum + a.price, 0) || 0;
                return sum + (item.price + additionsTotal) * item.quantity;
              }, 0)}
            </h3>
          </div>
        </>
      )}
    </div>
  );
}