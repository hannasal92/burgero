import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppImage from "../components/common/AppImage";
import CartIcon from "../components/common/CartIcon";
import { useCart } from "../context/useCart";
import { useProducts } from "../context/useProduct";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const [filter, setFilter] = useState("*");
  const navigate = useNavigate();
  // const [menuItems, setMenuItems] = useState([]); // <-- products from DB
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [addedItem, setAddedItem] = useState(null);


  const filters = [
    { label: "הכל", value: "*" },
    { label: "בורגיר", value: "burger" },
    { label: "פיצה", value: "pizza" },
    { label: "באסתה", value: "pasta" },
    { label: "מתוגנים", value: "fries" },
  ];

  const filteredItems = products.filter(
    (item) => filter === "*" || item.category === filter
  );

  const handleAddToCart = (item) => {
    addToCart({ ...item, quantity: 1, note: "" });
    setAddedItem(item.name);
    setTimeout(() => setAddedItem(null), 2000);
  };

  return (
    <section className="food_section layout_padding-bottom" style={{ padding: "20px" }}>
      <div className="container">
        <div className="heading_container heading_center">
          <h2>התפריט שלנו</h2>
        </div>

        <ul className="filters_menu">
          {filters.map((f) => (
            <li
              key={f.value}
              className={filter === f.value ? "active" : ""}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </li>
          ))}
        </ul>

        <div className="filters-content">
          <div className="row grid">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className={`col-sm-6 col-lg-4 all ${item.category}`}
                >
                  <div className="box">
                    <div className="img-box">
                      <AppImage src={`/images/${item.image}`} alt={item.name} />
                    </div>
                    <div className="detail-box" style={{ height: "200px" }}>
                      <h5>{item.name}</h5>
                      <p>{item.description}</p>
                      <div className="options">
                        <h6>{item.price} ₪</h6>
                        <button
                          className="add-to-cart-btn"
                          onClick={() => handleAddToCart(item)}
                        >
                          <CartIcon width={24} height={24} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {addedItem && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "fixed",
                bottom: 20,
                right: 20,
                background: "#FFD700",
                color: "#000",
                padding: "12px 20px",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                zIndex: 9999,
              }}
              onClick={() => navigate("/cart")} // navigate on click
            >
              {addedItem} נוסף לעגלה! 🛒
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}