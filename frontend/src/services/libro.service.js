import axios from './root.service.js';

export async function getLibros() {
  try {
    const response = await axios.get('/libro/all');
    return response.data.data;
  } catch (error) {
    return [];
  }
}

export async function crearLibro(data) {
  const response = await axios.post('/libro', data);
  return response.data.data;
}

export async function getLibroPorNombre(nombre) {
  const response = await axios.get(`/libro/${encodeURIComponent(nombre)}`);
  return response.data.data;
}

export async function actualizarLibro(id, data) {
  const response = await axios.patch(`/libro/${id}`, data);
  return response.data.data;
}

export async function eliminarLibro(nombre) {
  const response = await axios.delete(`/libro/${encodeURIComponent(nombre)}`);
  return response.data.data;
}

export async function crearMovimiento(data) {
  const response = await axios.post('/movimiento', data);
  return response.data.data;
}

export async function getMovimientosPorLibro(libroId) {
  const response = await axios.get(`/movimiento/${libroId}`);
  return response.data.data;
}

export async function actualizarMovimiento(id, data) {
  const response = await axios.patch(`/movimiento/${id}`, data);
  return response.data.data;
}

export async function eliminarMovimiento(id) {
  const response = await axios.delete(`/movimiento/${id}`);
  return response.data.data;
}

export async function getHistorialMovimientosPorLibro(libroId) {
  const response = await axios.get(`/movimiento/${libroId}/historial`);
  return response.data.data;
}

export async function restaurarMovimiento(movimientoId) {
  const response = await axios.patch(`/movimiento/${movimientoId}/restaurar`);
  return response.data.data;
}