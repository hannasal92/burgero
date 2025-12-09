export default function Cart({
  cartItems = [],
  onIncrease,
  onDecrease,
  onRemove,
  onNoteChange,     // <-- Add this prop
}) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2 className="cart-title">העגלה שלי</h2>

      {cartItems.length === 0 ? (
        <p className="empty-text">העגלה ריקה</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.cartId}>
                
                <img src={`../src/images/${item.img}`} alt={item.name} className="cart-img" />

                <div className="cart-details">
                  <h4 className="cart-name">{item.name}</h4>
                  <p className="cart-desc">{item.description}</p>
                  <p className="cart-price">{item.price} ₪</p>

                  {/* QUANTITY */}
                  <div className="quantity-box">
                    <button onClick={() => onDecrease(item.cartId)}
                    disabled={item.quantity === 1}
                    >-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onIncrease(item.cartId)}>+</button>
                  </div>

                  {/* TEXTAREA FOR NOTES */}
                  <textarea
                    className="note-textarea"
                    placeholder="הערות למנה (הוספות/הורדות)"
                    value={item.note || ""}
                    onChange={(e) => onNoteChange(item.cartId, e.target.value)}
                  ></textarea>

                </div>

                <button className="remove-btn" onClick={() => onRemove(item.cartId)}>
                  ✖
                </button>

              </div>
            ))}
          </div>

          <div className="cart-total">
            <h3>סכום כולל: {total} ₪</h3>
            
          </div>
        </>
      )}
    </div>
  );
}