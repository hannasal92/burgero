import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ show, onClose, children }) {
  const isMobile = window.innerWidth < 768;

  const modalStyle = {
    position: "fixed",
    top: "40%",
    left: isMobile ? "3%" : "75%",
    transform: "translate(-50%, -50%)",
    zIndex: 1001,
    backgroundColor: "#fff",
    padding: isMobile ? "20px" : "30px",
    borderRadius: "15px",
    width: isMobile ? "95%" : "400px",
    maxWidth: "95%",
    boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
    overflowY: "auto",
    maxHeight: "90vh",
  };
  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
  };
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1000,
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            style={overlayStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            style={modalStyle}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
             <button style={closeButtonStyle} onClick={onClose}>
              &times;
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}