import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@components/Navbar.jsx";
import { 
  getLibroPorNombre, actualizarLibro, eliminarLibro, crearMovimiento, getMovimientosPorLibro,
  getHistorialMovimientosPorLibro, restaurarMovimiento, actualizarMovimiento, eliminarMovimiento
} from "@services/libro.service.js";
import updateIcon from "../assets/updateIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";

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
  const [historialMovimientos, setHistorialMovimientos] = useState([]);
  const [historialLoading, setHistorialLoading] = useState(false);
  const [historialError, setHistorialError] = useState("");
  const [tabSeleccionado, setTabSeleccionado] = useState("recientes");
  const [movEditId, setMovEditId] = useState(null);

  async function fetchHistorialMovimientos() {
    setHistorialLoading(true);
    setHistorialError("");
    try {
      const movs = await getHistorialMovimientosPorLibro(libro.id);
      setHistorialMovimientos(movs);
    } catch (err) {
      setHistorialError("Error al cargar historial");
    }
    setHistorialLoading(false);
  }

  async function handleRestaurarMovimiento(id) {
    try {
      await restaurarMovimiento(id);
      await fetchHistorialMovimientos();
      const nuevosMovimientos = await getMovimientosPorLibro(libro.id);
      setMovimientos(nuevosMovimientos);
      const libroActualizado = await getLibroPorNombre(libro.nombre);
      setLibro(libroActualizado);
    } catch (err) {
      alert("Error al restaurar movimiento");
    }
  }

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
    <>
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
                        background: "#322dca1c",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "0.4rem 0.5rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        fontSize: "1.1rem",
                        display: "inline-flex",
                        alignItems: "center"
                      }}
                      title="Editar libro"
                    >
                      <img src={updateIcon} alt="Editar" style={{ width: 18, height: 18 }} />
                    </button>
                    <button
                      onClick={handleEliminar}
                      disabled={eliminando}
                      style={{
                        marginLeft: "0.5rem",
                        background: "#d32f2f1a",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "0.4rem 0.5rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        fontSize: "1.1rem",
                        display: "inline-flex",
                        alignItems: "center"
                      }}
                      title="Eliminar libro"
                    >
                      <img src={deleteIcon} alt="Eliminar" style={{ width: 18, height: 18 }} />
                  </button>
                </>
              )}
              </h2>
              {error && 
                <div style={{ background: "#e3f0ff", borderRadius: "8px", padding: "1rem 1.5rem", margin: "1.2rem 0",
                              color: "#1a237e", fontWeight: 600, fontSize: "1.08rem" }}
                >{error}
                </div>
              }
              <div style={{ background: "#e3f0ff", borderRadius: "8px", padding: "1rem 1.5rem", margin: "1.2rem 0",
                            color: "#1a237e", fontWeight: 600, fontSize: "1.08rem" }}
              >
                <p><b>Total de ganancias:</b> {libro.totalGanancias ?? 0}</p>
                <p><b>Total de gastos:</b> {libro.totalGastos ?? 0}</p>
                <p><b>Balance general:</b> {libro.balanceGeneral ?? 0}</p>
              </div>
              <div style={{ display: "flex", gap: "1.5rem", margin: "2rem 0 1.5rem 0" }}>
                <button
                  onClick={() => setTabSeleccionado("movimientos")}
                  style={{
                    background: tabSeleccionado === "movimientos" ? "#1976d2" : "#e3f0ff",
                    color: tabSeleccionado === "movimientos" ? "#fff" : "#1976d2",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.7rem 1.5rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "1rem",
                    boxShadow: tabSeleccionado === "movimientos" ? "0 2px 8px #1976d233" : "none"
                  }}
                >
                  Movimientos
                </button>
                <button
                  onClick={() => setTabSeleccionado("agregar")}
                  style={{
                    background: tabSeleccionado === "agregar" ? "#1976d2" : "#e3f0ff",
                    color: tabSeleccionado === "agregar" ? "#fff" : "#1976d2",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.7rem 1.5rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "1rem",
                    boxShadow: tabSeleccionado === "agregar" ? "0 2px 8px #1976d233" : "none"
                  }}
                >
                  Agregar Movimiento
                </button>
                <button
                  onClick={() => {
                    setTabSeleccionado("historial");
                    fetchHistorialMovimientos();
                  }}
                  style={{
                    background: tabSeleccionado === "historial" ? "#1976d2" : "#e3f0ff",
                    color: tabSeleccionado === "historial" ? "#fff" : "#1976d2",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.7rem 1.5rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "1rem",
                    boxShadow: tabSeleccionado === "historial" ? "0 2px 8px #1976d280" : "none"
                  }}
                >
                  Historial Completo
                </button>
              </div>
              {tabSeleccionado === "movimientos" && (
                <>
                  <h3 style={{ 
                    color: "#1a237e", fontWeight: 700, fontSize: "1.25rem", marginBottom: "1rem"
                  }}>
                    Movimientos del libro</h3>
                  {movimientosLoading ? (
                    <p>Cargando movimientos...</p>
                  ) : movimientos.length === 0 ? (
                    <p style={{ color: "#888" }}>No hay movimientos registrados.</p>
                  ) : (
                    <table style={{ width: "100%", marginTop: "1rem", background: "#f8fbff", borderRadius: "8px", 
                                    borderCollapse: "collapse", boxShadow: "0 2px 8px #1976d233" }}>
                      <thead>
                        <tr style={{ color: "#fff", background: "#1976d2" }}>
                          <th style={{ padding: "0.9rem", fontWeight: 700, textAlign: "center" }}>Fecha</th>
                          <th style={{ padding: "0.9rem", fontWeight: 700, textAlign: "center" }}>Monto</th>
                          <th style={{ padding: "0.9rem", fontWeight: 700, textAlign: "center" }}>Tipo</th>
                          <th style={{ padding: "0.9rem", fontWeight: 700, textAlign: "center" }}>Descripción</th>
                          <th style={{ padding: "0.9rem", fontWeight: 700, textAlign: "center" }}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {movimientos.map((mov, idx) => (
                          <tr
                            key={mov.id}
                            style={{
                              background: idx % 2 === 0 ? "#e3f0ff" : "#fff",
                              color: "#1a237e",
                            }}
                          >
                            <td style={{ padding: "0.7rem", borderBottom: "1px solid #cfd8dc", textAlign: "center" }}>
                              {mov.fechaCreacion ? new Date(mov.fechaCreacion).toLocaleString("es-CL") : "-"}
                            </td>
                            <td style={{ padding: "0.7rem", borderBottom: "1px solid #cfd8dc", textAlign: "center" }}>{mov.monto}</td>
                            <td style={{ padding: "0.7rem", borderBottom: "1px solid #cfd8dc", textAlign: "center" }}>{mov.tipo}</td>
                            <td style={{ padding: "0.7rem", borderBottom: "1px solid #cfd8dc", textAlign: "center" }}>{mov.descripcion}</td>
                            <td style={{ padding: "0.7rem", borderBottom: "1px solid #cfd8dc", textAlign: "center" }}>
                              <button
                                style={{
                                  background: "#4292dd21",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "6px",
                                  padding: "0.2rem 0.4rem",
                                  cursor: "pointer",
                                  marginRight: "0.3rem",
                                }}
                                title="Editar movimiento"
                                onClick={() => {
                                  setMovEditId(mov.id);
                                  setMovMonto(mov.monto);
                                  setMovDescripcion(mov.descripcion);
                                  setMovTipo(mov.tipo);
                                  setTabSeleccionado("agregar");
                                }}
                              >
                                <img src={updateIcon} alt="Editar" style={{ width: 16, height: 16 }} />
                              </button>
                              <button
                                style={{
                                  background: "#d32f2f1a",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "6px",
                                  padding: "0.2rem 0.4rem",
                                  cursor: "pointer"
                                }}
                                title="Eliminar movimiento"
                                onClick={async () => {
                                  if (window.confirm("¿Seguro que deseas eliminar este movimiento? Esta acción no se puede deshacer.")) {
                                      await eliminarMovimiento(mov.id);
                                      const nuevosMovimientos = await getMovimientosPorLibro(libro.id);
                                      setMovimientos(nuevosMovimientos);
                                      const libroActualizado = await getLibroPorNombre(libro.nombre);
                                      setLibro(libroActualizado);
                                  }
                                }}
                              >
                                <img src={deleteIcon } alt="Eliminar" style={{ width: 16, height: 16 }} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}

              {tabSeleccionado === "agregar" && (
                <>
                  <h3 style={{
                    color: "#1a237e", fontWeight: 700, fontSize: "1.25rem", marginBottom: "1rem"  
                  }}>
                    Agregar movimiento</h3>
                  <form
                    onSubmit={async e => {
                      e.preventDefault();
                      setMovError("");
                      setMovLoading(true);
                      try {
                        if (movEditId) {
                          const datos = {
                            monto: Number(movMonto),
                            descripcion: movDescripcion,
                            tipo: movTipo,
                          };
                          await actualizarMovimiento(movEditId, datos);
                          setMovEditId(null);
                        } else {
                          await crearMovimiento({
                            monto: movMonto,
                            descripcion: movDescripcion,
                            tipo: movTipo,
                            libroContable: libro.id
                          });
                        }
                      setMovMonto("");
                      setMovDescripcion("");
                      setMovTipo("gasto");
                      const nuevosMovimientos = await getMovimientosPorLibro(libro.id);
                      setMovimientos(nuevosMovimientos);
                      const libroActualizado = await getLibroPorNombre(libro.nombre);
                      setLibro(libroActualizado);
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
                    {movLoading ? (movEditId ? "Guardando..." : "Agregando...") : (movEditId ? "Guardar cambios" : "Agregar")}
                  </button>
                  {movEditId && (
                    <button
                      type="button"
                      style={{
                        background: "#eee",
                        color: "#1a237e",
                        border: "none",
                        borderRadius: "6px",
                        padding: "0.5rem 1.2rem",
                        fontWeight: 500,
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        setMovEditId(null);
                        setMovMonto("");
                        setMovDescripcion("");
                        setMovTipo("gasto");
                      }}
                    >
                      Cancelar edición
                    </button>
                  )}
                  {movError && <div style={{ color: "#d32f2f" }}>{movError}</div>}
                </form>
              </>
            )}

            {tabSeleccionado === "historial" && (
              <div>
              <h3 style={{
                    color: "#1a237e", fontWeight: 700, fontSize: "1.25rem", marginBottom: "1rem"  
                  }}>
                    Historial de movimientos</h3>
              {historialLoading ? (
                <p>Cargando historial...</p>
              ) : historialError ? (
                <p style={{ color: "#d32f2f" }}>{historialError}</p>
              ) : (
                <table style={{ width: "100%", marginTop: "1rem", background: "#f8fbff", borderRadius: "8px",
                                borderCollapse: "collapse", boxShadow: "0 2px 8px #1976d233" }}>
                  <thead>
                    <tr style={{ background: "#1976d2", color: "#fff" }}>
                      <th style={{ padding: "0.9rem", fontWeight: 700, textAlign: "center" }}>Fecha</th>
                      <th style={{ padding: "0.9rem", fontWeight: 700, textAlign: "center" }}>Monto</th>
                      <th style={{ padding: "0.9rem", fontWeight: 700, textAlign: "center" }}>Tipo</th>
                      <th style={{ padding: "0.9rem", fontWeight: 700, textAlign: "center" }}>Descripción</th>
                      <th style={{ padding: "0.9rem", fontWeight: 700, textAlign: "center" }}>Estado</th>
                      <th style={{ padding: "0.9rem", fontWeight: 700, textAlign: "center" }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historialMovimientos.map((mov, idx) => (
                      <tr key={mov.id}
                        style={{
                          background: idx % 2 === 0 ? "#e3f0ff" : "#fff",
                          color: "#1a237e"
                        }}>
                        <td style={{ padding: "0.7rem", borderBottom: "1px solid #cfd8dc" }}>
                          {mov.fechaCreacion ? new Date(mov.fechaCreacion).toLocaleString("es-CL") : "-"}</td>
                        <td style={{ padding: "0.7rem", borderBottom: "1px solid #cfd8dc", textAlign: "center" }}>{mov.monto}</td>
                        <td style={{ padding: "0.7rem", borderBottom: "1px solid #cfd8dc", textAlign: "center" }}>{mov.tipo}</td>
                        <td style={{ padding: "0.7rem", borderBottom: "1px solid #cfd8dc", textAlign: "center" }}>{mov.descripcion}</td>
                        <td style={{ padding: "0.7rem", borderBottom: "1px solid #cfd8dc", textAlign: "center" }}>{mov.eliminado ? "Eliminado" : "Activo"}</td>
                        <td>
                          {mov.eliminado && (
                            <button
                              style={{ background: "#43a047", color: "#fff", borderRadius: "6px", padding: "0.3rem 1rem", cursor: "pointer", border: "none" }}
                              onClick={() => handleRestaurarMovimiento(mov.id)}
                            >
                              Restaurar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              </div> 
            )}
          </>
        )}
        </div>
      </div>
    </>
  )
}