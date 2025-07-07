import axios from './root.service.js';

export async function getDocumentos() {
	try {
		const { data } = await axios.get('/documento/all');
		return data.data;
	} catch (error) {
		return (
			error.response?.data || {
				status: 'error',
				message: 'Error al obtener documentos',
			}
		);
	}
}

export async function getDocumento(id) {
	try {
		const { data } = await axios.get(`/documento/${id}`);
		return data.data;
	} catch (error) {
		return (
			error.response?.data || {
				status: 'error',
				message: 'Error al obtener documento',
			}
		);
	}
}

export async function createDocumento(documentoData) {
	try {
		const { data } = await axios.post('/documento/', documentoData);
		return data.data;
	} catch (error) {
		console.error(
			'Error en createDocumento:',
			error.response?.data || error.message
		);
		throw error;
	}
}

export async function updateDocumento(id, documentoData) {
	try {
		console.log('Enviando PATCH con datos:', documentoData); // <- útil para depurar
		const { data } = await axios.patch(`/documento/${id}`, documentoData);
		return data.data;
	} catch (error) {
		console.error(
			'Error en updateDocumento:',
			error.response?.data || error.message
		);
		throw error;
	}
}

export async function deleteDocumento(id) {
	try {
		const { data } = await axios.delete(`/documento/${id}`);
		return data;
	} catch (error) {
		console.error(
			'Error en deleteDocumento:',
			error.response?.data || error.message
		);
		throw error;
	}
}
