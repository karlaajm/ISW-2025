import Navbar from "@components/Navbar.jsx";

export default function LibrosPage() {
  return (
    <div className="main-content">
      <Navbar />
      <div style={{
        maxWidth: 900,
        margin: "3rem auto",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 12px rgba(30,40,100,0.08)",
        padding: "2.5rem"
      }}>
        <h2 style={{ color: "#1a237e" }}>Libros Contables</h2>
        <p style={{ color: "#333" }}>
          Aquí aparecerá el listado de libros contables del sistema.
        </p>
      </div>
    </div>
  );
}