import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/useCart";
import UserDropdown from "./common/UserDropDown";
import CartIcon from "../components/common/CartIcon";
import Button from "../components/common/Button";

export default function Header() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { getTotal } = useCart();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get current route

  const handleClick = () => {
    navigate("/menu"); // navigate to /menu
  };

  // Helper function to check if link is active
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <header className="header_section" style={{ background: "#090808ff" }}>
      <div className="container">
        <nav className="navbar navbar-expand-lg custom_nav-container">
          {/* Logo */}
          <Link className="navbar-brand text-white" to="/home">
            <span>Burgero Bar</span>
          </Link>

          {/* Mobile toggle */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <ul className="navbar-nav mx-auto">
              <li className={`nav-item ${isActive("/home")}`}>
                <Link className="nav-link" to="/home">בית</Link>
              </li>
              <li className={`nav-item ${isActive("/menu")}`}>
                <Link className="nav-link" to="/menu">תפריט</Link>
              </li>
              {!user && (
                <li className={`nav-item ${isActive("/login")}`}>
                  <Link className="nav-link" to="/login">להתחבר למערכת</Link>
                </li>
              )}
              {user && (
                <li className={`nav-item ${isActive("/orders")}`}>
                  <Link className="nav-link" to="/orders">ההזמנות שלך</Link>
                </li>
              )}
              <li className={`nav-item ${isActive("/bookTable")}`}>
                <Link className="nav-link" to="/bookTable">הזמנת שולחן</Link>
              </li>
              <li className={`nav-item ${isActive("/about")}`}>
                <Link className="nav-link" to="/about">עלינו</Link>
              </li>
            </ul>

            <div className="user_option">
              <UserDropdown />

              <Link className="cart_link" to="/cart">
                <CartIcon count={getTotal()} />
              </Link>

              <form className="form-inline">
                <button className="btn nav_search-btn" type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>

              <Button className="order_online" onClick={handleClick}>
                תזמין אונליין
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}