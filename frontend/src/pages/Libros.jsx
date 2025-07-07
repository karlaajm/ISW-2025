import { useEffect, useState } from "react";
import Navbar from "@components/Navbar.jsx";
import { getLibros } from "@services/libro.service.js";
import { crearLibro } from "@services/libro.service.js";
import { useNavigate } from "react-router-dom";


export default function LibrosPage() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [nombreLibro, setNombreLibro] = useState("");
  const [creando, setCreando] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLibros() {
      const data = await getLibros();
      setLibros(data);
      setLoading(false);
      console.log(data);
    }
    fetchLibros();
  }, []);

  return (
    <div className="main-content" style={{ background: "#e3f0ff", minHeight: "100vh" }}>
      <Navbar />
      <button
        style={{
          background: "#1a237e",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "0.7rem 1.5rem",
          fontWeight: 600,
          fontSize: "1rem",
          cursor: "pointer",
          marginBottom: "1.5rem",
          float: "right"
        }}
        onClick={() => setShowForm(true)}
      >
        + Nuevo libro
      </button>
      {showForm && (
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(30,40,100,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000
      }}>
      <form
        style={{
          background: "#fff",
          padding: "2rem 2.5rem",
          borderRadius: "12px",
          boxShadow: "0 4px 32px rgba(30,40,100,0.18)",
          minWidth: 320
        }}
      onSubmit={async e => {
        e.preventDefault();
        setCreando(true);
        setError("");
        try {
          const libroCreado = await crearLibro({ nombre: nombreLibro });
          setShowForm(false);
          setNombreLibro("");
          setCreando(false);
          console.log(libroCreado)
          if (libroCreado?.nombre) {
            navigate(`/libro/${encodeURIComponent(libroCreado.nombre)}`);
          } else {
            setError("No se puedo obtener el ID del libro creado.")
          }
        } catch (err) {
          setError("Error al crear libro");
          setCreando(false);
        }
      }}>
      <h3 style={{ color: "#1a237e", marginBottom: "1rem" }}>Nuevo libro</h3>
      <input
        type="text"
        placeholder="Nombre del libro"
        value={nombreLibro}
        onChange={e => setNombreLibro(e.target.value)}
        required
        style={{
          width: "100%",
          padding: "0.7rem",
          borderRadius: "6px",
          border: "1px solid #bdbdbd",
          marginBottom: "1rem"
        }}
      />
      {error && <div style={{ color: "#d32f2f", marginBottom: "1rem" }}>{error}</div>}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          style={{
            background: "#eee",
            color: "#1a237e",
            border: "none",
            borderRadius: "6px",
            padding: "0.6rem 1.2rem",
            fontWeight: 500,
            cursor: "pointer"
          }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={creando}
          style={{
            background: "#1a237e",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0.6rem 1.2rem",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          {creando ? "Creando..." : "Crear"}
        </button>
      </div>
      </form>
      </div>
      )}
      <div style={{
        maxWidth: 950,
        margin: "3rem auto",
        background: "#fff",
        borderRadius: "18px",
        boxShadow: "0 4px 32px rgba(30,40,100,0.18)",
        padding: "2.5rem 2rem",
        borderLeft: "8px solid #1a237e"
      }}>
        <h2 style={{ color: "#1a237e", marginBottom: "2rem", fontWeight: 700, letterSpacing: "1px" }}>
          Libros Contables
        </h2>
        {loading ? (
          <p style={{ color: "#1a237e", fontWeight: 500 }}>Cargando libros...</p>
        ) : !Array.isArray(libros) || libros.length === 0 ? (
          <p style={{ color: "#d32f2f", fontWeight: 500 }}>No hay libros registrados.</p>
        ) : (
          <table style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
            background: "#f8fbff",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 1px 8px rgba(30,40,100,0.10)"
          }}>
            <thead>
              <tr style={{ background: "#1a237e" }}>
                <th style={{
                  padding: "1rem",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  letterSpacing: "0.5px",
                  textAlign: "center"
                }}>Nombre</th>
                <th style={{
                  padding: "1rem",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  letterSpacing: "0.5px",
                  textAlign: "center"
                }}>Fecha de creación</th>
                <th style={{
                  padding: "1rem",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  letterSpacing: "0.5px",
                  textAlign: "center"
                }}>Última edición</th>
              </tr>
            </thead>
            <tbody>
              {libros.map((libro, idx) => (
                <tr
                  key={libro.id}
                  style={{
                    background: idx % 2 === 0 ? "#e3f0ff" : "#f8fbff"
                  }}
                >
                  <td style={{
                    padding: "0.9rem",
                    borderBottom: "1px solid #dbeafe",
                    fontWeight: 500,
                    color: "#1a237e",
                    textAlign: "center",
                    cursor: "pointer",
                    textDecoration: "underline"
                  }}
                  onClick={() => navigate(`/libro/${encodeURIComponent(libro.nombre)}`)}
                  >
                    {libro.nombre}
                  </td>
                  <td style={{
                    padding: "0.9rem",
                    borderBottom: "1px solid #dbeafe",
                    color: "#333",
                    textAlign: "center"
                  }}>
                    {libro.fechaCreacion
                      ? new Date(libro.fechaCreacion).toLocaleString("es-CL", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit"
                        })
                      : "-"}
                  </td>
                  <td style={{
                    padding: "0.9rem",
                    borderBottom: "1px solid #dbeafe",
                    color: "#333",
                    textAlign: "center"
                  }}>
                    {libro.fechaActualizacion
                      ? new Date(libro.fechaActualizacion).toLocaleString("es-CL", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit"
                        })
                      : "-"}
                  </td>   
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}