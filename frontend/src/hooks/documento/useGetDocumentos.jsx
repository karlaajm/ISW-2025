import { useState, useEffect } from 'react';
import { getDocumentos } from '@services/documento.service.js';

const useDocumentos = () => {
	const [documentos, setDocumentos] = useState([]);

	const fetchDocumentos = async () => {
		try {
			const response = await getDocumentos();
			const formattedData = response.map(doc => ({
				id: doc.id,
				nombre: doc.nombre,
				fechaSubida: doc.fechaSubida,
				archivoBase64: doc.archivoBase64
			}));
			setDocumentos(formattedData);
			return formattedData;
		} catch (error) {
			console.error("Error al obtener documentos:", error);
			return [];
		}
	};

	useEffect(() => {
		fetchDocumentos();
	}, []);

	return { documentos, fetchDocumentos, setDocumentos };
};

export default useDocumentos;
