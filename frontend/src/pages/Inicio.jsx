"use strict";
import Navbar from "@components/Navbar.jsx";

export default function InicioPage() {
  return (
    <div>
      <Navbar />
      <div style={{
        maxWidth: 600,
        margin: "3rem auto",
        textAlign: "center",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 12px rgba(30,40,100,0.08)",
        padding: "2.5rem"
      }}>
        <h1 style={{ color: "#1a237e" }}>¡Bienvenido!</h1>
        <p style={{ fontSize: "1.2rem", color: "#333" }}>
          Usa la barra de navegación para acceder a las funcionalidades del sistema.
        </p>
      </div>
    </div>
  );
}