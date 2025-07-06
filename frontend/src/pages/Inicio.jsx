"use strict";
import Navbar from "@components/Navbar.jsx";

export default function InicioPage() {
  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: 600, margin: "2rem auto", textAlign: "center" }}>
        <h1>Bienvenido al Sistema Contable</h1>
        <p>
          Usa la barra de navegación para acceder a las funcionalidades del sistema.
        </p>
      </div>
    </div>
  );
}