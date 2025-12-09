import { useState } from "react";
import '../css/style.css';
import CartIcon from "../components/common/CartIcon";
import Button from "../components/common/Button"; // adjust path if needed

export default function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <div  className="page-container">
  
      <main className="content-wrap" style={{ padding: "50px 20px" }}>
        <h2 style={{ textAlign: "center" }}>Login Page</h2>
        {/* Add your login form here */}
      </main>

      {/* ---------------- FOOTER ---------------- */}
    </div>
  );
}