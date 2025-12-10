import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import CartIcon from "../components/common/CartIcon";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import UserDropdown from "./common/UserDropDown";
import { useAuth } from "../context/AuthContext";
export default function Header() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { getTotal } = useCart();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/menu"); // navigate to /menu
  };
  return (
        <>
              {/* ---------------- HEADER ---------------- */}
              <header className="header_section" style={{ background: "#090808ff", }}>
                <div className="container">
                  <nav className="navbar navbar-expand-lg custom_nav-container">
        
                    {/* Logo */}
                    <Link className="navbar-brand text-white" to="/home">
                      <span >Burgero Bar</span>
                    </Link>
        
                    {/* Mobile toggle button */}
                    <button
                      className="navbar-toggler"
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>
        
                   <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
                      <ul className="navbar-nav mx-auto">
                        <li className="nav-item active"><Link className="nav-link" to="/home">בית</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/menu">תפריט</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/about">עלינו</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/bookTable">הזמנת שולחן</Link></li>
                        {/* Only show login if user is NOT logged in */}
                        {!user && (
                          <li className="nav-item">
                            <Link className="nav-link" to="/login">להתחבר למערכת</Link>
                          </li>
                        )}
                        {user && (
                          <li className="nav-item">
                            <Link className="nav-link" to="/orders">ההזמנמות שלך</Link>
                          </li>
                      )}
                      </ul>
        
                   <div className="user_option">
                      {/* User Icon */}
                       <UserDropdown />
        
                       <Link className="cart_link" to="/cart">
                        <CartIcon count={getTotal()} />
                      </Link>
                      {/* Search Form */}
                      <form className="form-inline">
                        <button className="btn nav_search-btn" type="submit">
                          <i className="fa fa-search"></i>
                        </button>
                      </form>
        
                      {/* Order Online Link */}
                    <Button className="order_online" onClick={handleClick}>
                      תזמין אונליין
                    </Button>
                      {/* Cart Icon */}
                   
                    </div>
                    </div>
    
                  </nav>
                </div>
              </header>
        </>
  );
}