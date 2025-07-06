"use strict";
import Navbar from "@components/Navbar.jsx";

export default function InicioPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #e3f0ff 0%, #f8fbff 100%)"
    }}>
      <Navbar />
      <div style={{
        maxWidth: 600,
        margin: "3rem auto",
        textAlign: "center",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 16px rgba(30,40,100,0.08)",
        padding: "2.5rem",
      }}>
        <h1 style={{ color: "#1a237e", marginBottom: "1.5rem" }}>¡Bienvenido!</h1>
        <p style={{ fontSize: "1.15rem", color: "#333" }}>
          Este es el sistema para el CEE.
        </p>
        <p style={{ color: "#555" }}>
          Use la barra de navegación para acceder a las funcionalidades del sistema.
        </p>
      </div>
    </div>
  );
}