import axios from './root.service.js';

export async function getLibros() {
  const { data } = await axios.get('/libro/all');
  return data;
}