import { useEffect, useState } from "react";
import { orderApi } from "../api/orderApi";
import Spinner from "../components/common/Spinner";

const ORDER_STATUS_CONFIG = {
  pending: {
    label: "ממתין",
    bg: "#fff3cd",
    color: "#856404",
    icon: "⏳",
  },
  paid: {
    label: "שולם",
    bg: "#e6f4ea",
    color: "#2e7d32",
    icon: "✅",
  },
  preparing: {
    label: "בהכנה",
    bg: "#e3f2fd",
    color: "#1565c0",
    icon: "👨‍🍳",
  },
  delivered: {
    label: "נמסר",
    bg: "#ede7f6",
    color: "#5e35b1",
    icon: "🚚",
  },
  canceled: {
    label: "בוטל",
    bg: "#fdecea",
    color: "#c62828",
    icon: "❌",
  },
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderApi.get();
        setOrders(res.data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("לא ניתן לטעון הזמנות");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* -------------------- STATES -------------------- */

    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <Spinner size={50} />
        </div>
      );
    }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "50px 20px", background: "#f7f7f7", minHeight: "100vh" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontWeight: "800",
          letterSpacing: "1px",
        }}
      >
        ההזמנות שלי 🍔
      </h2>

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* EMPTY STATE */}
        {orders.length === 0 && (
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "60px 20px",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>🛒</div>
            <h3 style={{ marginBottom: "10px" }}>אין הזמנות עדיין</h3>
            <p style={{ color: "#777" }}>
              ברגע שתבצע הזמנה – היא תופיע כאן
            </p>
          </div>
        )}

        {/* ORDERS */}
        {orders.map((order) => {
          const formattedDate = new Date(order.createdAt).toLocaleString("he-IL");
          const status =
            ORDER_STATUS_CONFIG[order.status] ||
            ORDER_STATUS_CONFIG.pending;

          return (
            <div
              key={order._id}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "25px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
              }}
            >
              {/* HEADER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <div>
                  <div style={{ fontWeight: "700", fontSize: "1.1rem" }}>
                    הזמנה #{order._id.slice(-6)}
                  </div>
                  <div style={{ fontSize: "0.9rem", color: "#777" }}>
                    {formattedDate}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      background: status.bg,
                      color: status.color,
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    {status.icon} {status.label}
                  </span>

                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      background: "#e6f4ea",
                      color: "#2e7d32",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                    }}
                  >
                    💳 {order.paymentType}
                  </span>
                </div>
              </div>

              {/* ITEMS */}
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: "15px",
                    padding: "15px 0",
                    borderBottom:
                      idx !== order.items.length - 1
                        ? "1px solid #eee"
                        : "none",
                  }}
                >
                  <img
                    src={`../src/images/${item.imageUrl}`}
                    alt={item.name}
                    style={{
                      width: "130px",
                      height: "120px",
                      borderRadius: "12px",
                      objectFit: "cover",
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "700", fontSize: "1rem" }}>
                      {item.name}
                    </div>

                    <div style={{ fontWeight: "600", marginTop: "4px" }}>
                      {item.quantity} × ₪{item.price}
                    </div>

                    {item.selectedAdditions?.length > 0 && (
                      <div style={{ marginTop: "6px", fontSize: "0.85rem" }}>
                        תוספות:
                        <ul style={{ margin: "4px 0 0 18px" }}>
                          {item.selectedAdditions.map((add, i) => (
                            <li key={i}>
                              {add.name} (+₪{add.price})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.note && (
                      <div
                        style={{
                          marginTop: "6px",
                          fontSize: "0.8rem",
                          color: "#777",
                        }}
                      >
                        הערה: {item.note}
                      </div>
                    )}
                  </div>

                  <div style={{ fontWeight: "700", color: "#ff9800" }}>
                    ₪{item.totalPrice}
                  </div>
                </div>
              ))}

              {/* TOTAL */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                  paddingTop: "15px",
                  borderTop: "2px dashed #eee",
                }}
              >
                <span style={{ fontWeight: "700" }}>סה״כ לתשלום</span>
                <span
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "800",
                    color: "#ff9800",
                  }}
                >
                  ₪{order.total}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}