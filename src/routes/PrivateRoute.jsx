// src/routes/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HeaderSp from "../components/HeaderSp";
import Footer from "../components/Footer";

export default function PrivateRoute() {
  const { accessToken } = useAuth();

  if (!accessToken) return <Navigate to="/login" />;

  return (
    <>
      <HeaderSp />
      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}