"use strict";
import { Link, useNavigate } from "react-router-dom";
import "@styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    document.cookie = "jwt-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/inicio">Inicio</Link>
        <Link to="/libros">Libros Contables</Link>
      </div>
      <button className="logout" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </nav>
  );
}