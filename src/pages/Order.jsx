// src/pages/Orders.jsx
import { useState } from "react";

export default function Orders() {
  const [orders] = useState([
    {
      _id: "693ebf0537fcd6f942fb1ea2",
      paymentType: "creditCard",
      status: "pending",
      total: 60,
      createdAt: "2025-12-14T15:43:33.125+02:00",
      items: [
        {
          productId: "693ac653a251d4e2ac04ac41",
          imageUrl : "./src/images/f2.png",
          name: "בורגר בקר קלאסי",
          price: 55,
          quantity: 1,
          note: "1234241",
          totalPrice: 60,
          selectedAdditions: [
            { name: "Cheese", price: 5 },
          ],
        },
               {
          productId: "693ac653a251d4e2ac04ac41",
          imageUrl : "./src/images/f2.png",
          name: "בורגר בקר קלאסי",
          price: 55,
          quantity: 1,
          note: "1234241",
          totalPrice: 60,
          selectedAdditions: [
            { name: "Cheese", price: 5 },
          ],
        },
      ],
    },
    {
      _id: "693ec10837fcd6f942fb1ebb",
      paymentType: "creditCard",
      status: "pending",
      total: 55,
      createdAt: "2025-12-14T15:52:08.853+02:00",
      items: [
        {
          productId: "693ac653a251d4e2ac04ac41",
          name: "בורגר בקר קלאסי",
          imageUrl : "./src/images/f2.png",
          price: 55,
          quantity: 1,
          note: "1212",
          totalPrice: 55,
          selectedAdditions: [],
        },
      ],
    },
  ]);

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
        {orders.map((order) => {
          const formattedDate = new Date(order.createdAt).toLocaleString("he-IL");

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
              {/* LEFT */}
              <div>
                <div style={{ fontWeight: "700", fontSize: "1.1rem" }}>
                  הזמנה #{order._id.slice(-6)}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#777" }}>
                  {formattedDate}
                </div>
              </div>

              {/* RIGHT — STATUS + PAYMENT */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                {/* STATUS */}
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    background: "#fff3cd",
                    color: "#856404",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                  }}
                >
                  ⏳ {order.status}
                </span>

                {/* PAYMENT TYPE */}
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
                  {/* IMAGE */}
                  <img
                    src={item.imageUrl || "/images/placeholder.png"}
                    alt={item.name}
                    style={{
                      width: "120px",
                      height: "90px",
                      borderRadius: "12px",
                      objectFit: "cover",
                      background: "#fafafa",
                    }}
                  />

                  {/* DETAILS */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "700", fontSize: "1rem" }}>
                      {item.name}
                    </div>

                    <div
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        marginTop: "4px",
                      }}
                    >
                      {item.quantity} × ₪{item.price}
                    </div>

                    {/* ADDITIONS */}
                    {item.selectedAdditions.length > 0 && (
                      <div
                        style={{
                          marginTop: "6px",
                          fontSize: "0.85rem",
                          color: "#555",
                        }}
                      >
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

                    {/* NOTE */}
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

                  {/* ITEM TOTAL */}
                  <div
                    style={{
                      fontWeight: "700",
                      color: "#ff9800",
                      alignSelf: "center",
                    }}
                  >
                    ₪{item.totalPrice}
                  </div>
                </div>
              ))}

              {/* TOTAL */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "20px",
                  paddingTop: "15px",
                  borderTop: "2px dashed #eee",
                }}
              >
                <span style={{ fontSize: "1rem", fontWeight: "700" }}>
                  סה״כ לתשלום
                </span>
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