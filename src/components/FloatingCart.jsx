import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CartIcon from "./common/CartIcon";
import { useCart } from "../context/useCart";

export default function FloatingCart({ visible }) {
  const navigate = useNavigate();
  const { cart } = useCart();

  if (cart.length === 0) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => navigate("/cart")}
          style={{
            position: "fixed",
            bottom: 65,
            right: 20,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#FFD700",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
            cursor: "pointer",
            zIndex: 9999,
          }}
        >
          <CartIcon width={28} height={28} />

          {/* Badge */}
          <span
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              background: "#000",
              color: "#fff",
              fontSize: 12,
              width: 20,
              height: 20,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            {cart.length}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}