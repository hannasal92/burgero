// src/components/UserDropdown.jsx
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (e) => {
    e.preventDefault(); // prevent default link behavior
    setOpen(!open);
  };

  if (!user) return null; // hide dropdown if not logged in

  return (
<>

    <div ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
      <a href="#" className="user_link" onClick={toggleDropdown}>
        <i className="fa fa-user" aria-hidden="true" style={{ fontSize: "1.5rem" }}></i>
      </a>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "120%",
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
            minWidth: "200px",
            zIndex: 100,
          }}
        >
          <div style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
            <strong> היי : {user.name}</strong>
            <br />
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px",
              background: "red",
              color: "#fff",
              border: "none",
              borderRadius: "0 0 8px 8px",
              cursor: "pointer",
            }}
          >
            להתנתק
          </button>
        </div>
      )}
    </div>
    </>
  );
  
}