// src/pages/Orders.jsx
import { useState } from "react";

export default function Orders() {
  // MOCK DATA
  const [orders] = useState([
    {
      _id: "1",
      date: "2025-12-10T14:32:00", // ISO string
      paymentMethod: "Credit Card", // added payment method
      products: [
        {
          name: "Classic Burger",
          description: "Juicy beef patty with cheese and lettuce",
          imageUrl: "./src/images/f1.png",
          quantity: 2,
          price: 25,
        },
        {
          name: "French Fries",
          description: "Crispy golden fries",
          imageUrl: "./src/images/f2.png",
          quantity: 1,
          price: 10,
        },
      ],
      totalPrice: 60,
    },
    {
      _id: "2",
      date: "2025-12-11T09:15:00",
      paymentMethod: "Credit Card", // added payment method
      products: [
        {
          name: "Veggie Pizza",
          description: "Delicious pizza with fresh vegetables",
          imageUrl: "./src/images/f3.png",
          quantity: 1,
          price: 35,
        },
        {
          name: "Coke",
          description: "Refreshing drink",
          imageUrl: "./src/images/f4.png",
          quantity: 2,
          price: 5,
        },
      ],
      totalPrice: 45,
    },
    {
      _id: "3",
      date: "2025-12-12T18:50:00",
      paymentMethod: "Credit Card", // added payment method
      products: [
        {
          name: "Chicken Wings",
          description: "Spicy and crispy",
          imageUrl: "./src/images/f1.png",
          quantity: 4,
          price: 8,
        },
      ],
      totalPrice: 32,
    },
  ]);

  return (
    <div className="page-container" style={{ padding: "50px 20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>הזמנות שלי</h2>

      <div
        className="orders-list"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {orders.map((order) => {
          const formattedDate = new Date(order.date).toLocaleString("he-IL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={order._id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                backgroundColor: "#fff",
              }}
            >
              <h4 style={{ marginBottom: "10px" }}>
                Order #{order._id} - {formattedDate}
              </h4>

              {order.products.map((product, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    padding: "10px 0",
                    borderBottom:
                      idx !== order.products.length - 1 ? "1px solid #eee" : "none",
                  }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                      {product.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        color: "#666",
                        marginTop: "5px",
                      }}
                    >
                      {product.description}
                    </div>
                    <div style={{ marginTop: "10px", fontWeight: "bold" }}>
                      כמות: {product.quantity} | מחיר ליחידה: ₪{product.price}
                    </div>
                  </div>
                </div>
              ))}

              <div
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  marginTop: "10px",
                }}
              >
                Total: ₪{order.totalPrice.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}