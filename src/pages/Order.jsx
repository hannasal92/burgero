import { useEffect, useState } from "react";
import { useOrders } from "../context/useOrders";
import Spinner from "../components/common/Spinner";

const ORDER_STATUS_CONFIG = {
  pending: { label: "ממתין", bg: "#fff3cd", color: "#856404", icon: "⏳" },
  done: { label: "מוכן", bg: "#e6f4ea", color: "#2e7d32", icon: "✅" },
  process: { label: "בהכנה", bg: "#e3f2fd", color: "#1565c0", icon: "👨‍🍳" },
  delivered: { label: "נמסר", bg: "#ede7f6", color: "#5e35b1", icon: "🚚" },
  canceled: { label: "בוטל", bg: "#fdecea", color: "#c62828", icon: "❌" },
};

export default function Orders() {
  const { orders, fetchOrders, totalPages, loading, error } = useOrders();
  const [page, setPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          background: "rgba(255,255,255,0.7)",
          zIndex: 9999,
        }}
      >
        <Spinner size={50} />
      </div>
    );

  if (error)
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;

  const isMobile = windowWidth < 768;

  return (
    <div style={{ padding: isMobile ? "20px 10px" : "50px 20px", minHeight: "100vh", background: "#f7f7f7" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", fontWeight: "800", fontSize: isMobile ? "1.5rem" : "2rem" }}>
        ההזמנות שלי 🍔
      </h2>

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {orders.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: isMobile ? "40px 10px" : "60px 20px",
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: isMobile ? "2.5rem" : "3rem", marginBottom: "15px" }}>🛒</div>
            <h3>אין הזמנות עדיין</h3>
            <p style={{ color: "#777" }}>ברגע שתבצע הזמנה – היא תופיע כאן</p>
          </div>
        ) : (
          <>
            {orders.map((order) => {
              const formattedDate = new Date(order.createdAt).toLocaleString("he-IL");
              const status = ORDER_STATUS_CONFIG[order.status] || ORDER_STATUS_CONFIG.pending;

              return (
                <div
                  key={order._id}
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: isMobile ? "15px" : "20px",
                    marginBottom: "25px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      justifyContent: "space-between",
                      alignItems: isMobile ? "flex-start" : "center",
                      marginBottom: "15px",
                      gap: isMobile ? "10px" : 0,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "700", fontSize: isMobile ? "1rem" : "1.1rem" }}>
                        הזמנה #{order.orderNumber}
                      </div>
                      <div style={{ fontSize: "0.9rem", color: "#777" }}>{formattedDate}</div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: isMobile ? "5px" : "0" }}>
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

                  {/* Items */}
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        gap: "15px",
                        padding: "15px 0",
                        borderBottom: idx !== order.items.length - 1 ? "1px solid #eee" : "none",
                        alignItems: isMobile ? "flex-start" : "center",
                      }}
                    >
                      <img
                        src={`../src/images/${item.imageUrl}`}
                        alt={item.name}
                        style={{
                          width: isMobile ? "100%" : "130px",
                          height: isMobile ? "auto" : "120px",
                          borderRadius: "12px",
                          objectFit: "cover",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "700", fontSize: "1rem" }}>{item.name}</div>
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
                          <div style={{ marginTop: "6px", fontSize: "0.8rem", color: "#777" }}>הערה: {item.note}</div>
                        )}
                      </div>
                      <div style={{ fontWeight: "700", color: "#ff9800", marginTop: isMobile ? "10px" : 0 }}>
                        ₪{item.totalPrice}
                      </div>
                    </div>
                  ))}

                  {/* Total */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      justifyContent: "space-between",
                      marginTop: "20px",
                      paddingTop: "15px",
                      borderTop: "2px dashed #eee",
                      gap: isMobile ? "10px" : 0,
                    }}
                  >
                    <span style={{ fontWeight: "700" }}>סה״כ לתשלום</span>
                    <span style={{ fontSize: "1.3rem", fontWeight: "800", color: "#ff9800" }}>
                      ₪{order.total}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Pagination */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => page !== i + 1 && setPage(i + 1)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: page === i + 1 ? "2px solid orange" : "1px solid #ccc",
                    background: page === i + 1 ? "orange" : "#fff",
                    color: page === i + 1 ? "#fff" : "#000",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}