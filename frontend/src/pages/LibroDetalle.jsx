import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@components/Navbar.jsx";
import { getLibroPorNombre, actualizarLibro, eliminarLibro, crearMovimiento, getMovimientosPorLibro } from "@services/libro.service.js";

export default function LibroDetalle() {
  const { id: nombreLibro } = useParams();
  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [eliminando, setEliminando] = useState(false);
  const [movMonto, setMovMonto] = useState("");
  const [movDescripcion, setMovDescripcion] = useState("");
  const [movTipo, setMovTipo] = useState("gasto");
  const [movLoading, setMovLoading] = useState(false);
  const [movError, setMovError] = useState("");
  const [movimientos, setMovimientos] = useState([]);
  const [movimientosLoading, setMovimientosLoading] = useState(true);

  useEffect(() => {
    async function fetchLibroYMovimientos() {
    setLoading(true);
    try {
      const data = await getLibroPorNombre(nombreLibro);
      setLibro(data);
      setNuevoNombre(data?.nombre || "");
      if (data?.id) {
        setMovimientosLoading(true);
        const movs = await getMovimientosPorLibro(data.id);
        setMovimientos(movs);
        setMovimientosLoading(false);
      } else {
        setMovimientos([]);
        setMovimientosLoading(false);
      }
    } catch (err) {
      setLibro(null);
      setMovimientos([]);
      setMovimientosLoading(false);
    }
    setLoading(false);
  }
  fetchLibroYMovimientos();
}, [nombreLibro]);

  const handleEditar = () => {
    setEditando(true);
    setError("");
  };

  const handleCancelar = () => {
    setEditando(false);
    setNuevoNombre(libro.nombre);
    setError("");
  };

  const handleGuardar = async e => {
    e.preventDefault();
    setGuardando(true);
    setError("");
    try {
      const actualizado = await actualizarLibro(nombreLibro, { nombre: nuevoNombre });
      setLibro(actualizado);
      setEditando(false);
      if (libro.nombre !== nuevoNombre) {
        window.location.href = `/libro/${encodeURIComponent(nuevoNombre)}`;
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Error al actualizar el libro"
      );
    }
    setGuardando(false);
  };

  const handleEliminar = async () => {
  if (!window.confirm("¿Seguro que deseas eliminar este libro? Esta acción no se puede deshacer.")) return;
  setEliminando(true);
  setError("");
  try {
    await eliminarLibro(libro.nombre);
    window.location.href = "/libros";
  } catch (err) {
    setError(
      err?.response?.data?.message ||
      "Error al eliminar el libro"
    );
  }
  setEliminando(false);
};

  return (
    <div className="main-content" style={{ background: "#e3f0ff", minHeight: "100vh" }}>
      <Navbar />
      <div style={{
        maxWidth: 700,
        margin: "3rem auto",
        background: "#fff",
        borderRadius: "14px",
        boxShadow: "0 2px 12px rgba(30,40,100,0.10)",
        padding: "2.5rem"
      }}>
        {loading ? (
          <p style={{ color: "#1a237e" }}>Cargando libro...</p>
        ) : !libro ? (
          <p style={{ color: "#d32f2f" }}>No se encontró el libro.</p>
        ) : (
          <>
            <h2 style={{ color: "#1a237e", marginBottom: "1.5rem" }}>
              {editando ? (
                <form onSubmit={handleGuardar} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <input
                    type="text"
                    value={nuevoNombre}
                    onChange={e => setNuevoNombre(e.target.value)}
                    required
                    style={{
                      fontSize: "1.3rem",
                      padding: "0.5rem 1rem",
                      borderRadius: "6px",
                      border: "1px solid #bdbdbd"
                    }}
                  />
                  <button
                    type="submit"
                    disabled={guardando}
                    style={{
                      background: "#1a237e",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "0.5rem 1.2rem",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    {guardando ? "Guardando..." : "Guardar"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelar}
                    style={{
                      background: "#eee",
                      color: "#1a237e",
                      border: "none",
                      borderRadius: "6px",
                      padding: "0.5rem 1.2rem",
                      fontWeight: 500,
                      cursor: "pointer"
                    }}
                  >
                    Cancelar
                  </button>
                </form>
              ) : (
                <>
                  {libro.nombre}
                  <button
                    onClick={handleEditar}
                    style={{
                      marginLeft: "1rem",
                      background: "#1a237e",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "0.4rem 1rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      fontSize: "1rem"
                    }}
                  >
                    Editar nombre
                  </button>
                  <button
                    onClick={handleEliminar}
                    disabled={eliminando}
                    style={{
                      marginLeft: "1rem",
                      background: "#d32f2f",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "0.4rem 1rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      fontSize: "1rem"
                    }}
                  >
                    {eliminando ? "Eliminando..." : "Eliminar libro"}
                  </button>
                      <hr style={{ margin: "2rem 0" }} />
                      <h3>Agregar movimiento</h3>
                      <form
                        onSubmit={async e => {
                          e.preventDefault();
                          setMovError("");
                          setMovLoading(true);
                          try {
                            await crearMovimiento({
                              monto: movMonto,
                              descripcion: movDescripcion,
                              tipo: movTipo,
                              libroContable: libro.id
                          });
                          setMovMonto("");
                          setMovDescripcion("");
                          setMovTipo("gasto");
                          const nuevosMovimientos = await getMovimientosPorLibro(libro.id);
                          setMovimientos(nuevosMovimientos);
                        } catch (err) {
                          setMovError(
                            err?.response?.data?.message ||
                            "Error al agregar movimiento"
                          );
                        }
                        setMovLoading(false);
                      }}
                      style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}
                    >
                      <input
                        type="number"
                        placeholder="Monto"
                        value={movMonto}
                        onChange={e => setMovMonto(e.target.value)}
                        required
                        style={{ width: 120, padding: "0.5rem" }}
                      />
                      <input
                        type="text"
                        placeholder="Descripción"
                        value={movDescripcion}
                        onChange={e => setMovDescripcion(e.target.value)}
                        required
                        style={{ width: 220, padding: "0.5rem" }}
                      />
                      <select
                        value={movTipo}
                        onChange={e => setMovTipo(e.target.value)}
                        required
                        style={{ padding: "0.5rem" }}
                      >
                        <option value="gasto">gasto</option>
                        <option value="ganancia">ganancia</option>
                      </select>
                      <button
                        type="submit"
                        disabled={movLoading}
                        style={{
                          background: "#1a237e",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          padding: "0.5rem 1.2rem",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        {movLoading ? "Agregando..." : "Agregar"}
                      </button>
                      {movError && <div style={{ color: "#d32f2f" }}>{movError}</div>}
                    </form>
                    <hr style={{ margin: "2rem 0" }} />
                    <h3>Movimientos del libro</h3>
                    {movimientosLoading ? (
                      <p>Cargando movimientos...</p>
                    ) : movimientos.length === 0 ? (
                      <p style={{ color: "#888" }}>No hay movimientos registrados.</p>
                    ) : (
                      <table style={{ width: "100%", marginTop: "1rem", background: "#f8fbff", borderRadius: "8px" }}>
                        <thead>
                          <tr style={{ background: "#e3f0ff" }}>
                            <th style={{ padding: "0.7rem" }}>Fecha</th>
                            <th style={{ padding: "0.7rem" }}>Monto</th>
                            <th style={{ padding: "0.7rem" }}>Tipo</th>
                            <th style={{ padding: "0.7rem" }}>Descripción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {movimientos.map(mov => (
                            <tr key={mov.id}>
                              <td style={{ padding: "0.6rem" }}>
                                {mov.fechaCreacion ? new Date(mov.fechaCreacion).toLocaleString("es-CL") : "-"}
                              </td>
                              <td style={{ padding: "0.6rem" }}>{mov.monto}</td>
                              <td style={{ padding: "0.6rem" }}>{mov.tipo}</td>
                              <td style={{ padding: "0.6rem" }}>{mov.descripcion}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                </>
              )}
            </h2>
            {error && <div style={{ 
  background: "#e3f0ff",
  borderRadius: "8px",
  padding: "1rem 1.5rem",
  margin: "1.2rem 0",
  color: "#1a237e",
  fontWeight: 600,
  fontSize: "1.08rem" }}>{error}</div>}

            <div style={{
              background: "#e3f0ff",
              borderRadius: "8px",
              padding: "1rem 1.5rem",
              margin: "1.2rem 0",
              color: "#1a237e",
              fontWeight: 600,
              fontSize: "1.08rem"
            }}>
              <p><b>Total de ganancias:</b> {libro.totalGanancias ?? 0}</p>
              <p><b>Total de gastos:</b> {libro.totalGastos ?? 0}</p>
              <p><b>Balance general:</b> {libro.balanceGeneral ?? 0}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}