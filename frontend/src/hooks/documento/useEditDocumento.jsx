import { useState } from 'react';
import { updateDocumento } from '@services/documento.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useEditDocumento = (setDocumentos) => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [dataDocumento, setDataDocumento] = useState([]);

	const handleClickUpdate = () => {
		if (dataDocumento.length > 0) {
			setIsPopupOpen(true);
		}
	};

	const handleUpdate = async (updatedData) => {
	if (updatedData) {
		try {
			console.log('Datos a actualizar:', updatedData);
			const updatedDoc = await updateDocumento(dataDocumento[0].id, updatedData);
			showSuccessAlert('¡Actualizado!', 'El documento ha sido actualizado correctamente.');
			setIsPopupOpen(false);
			setDocumentos(prevDocs => prevDocs.map(doc => (
				doc.id === updatedDoc.id ? updatedDoc : doc
			)));
			setDataDocumento([]);
		} catch (error) {
			const msg = error?.response?.data?.message || error?.message || '';
			if (msg.includes('Centro de Estudiantes') || msg.includes('CEE')) {
				showErrorAlert('Error', 'Acceso solo para el Centro de Estudiantes');
			} else {
				showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el documento.');
			}
			console.error('Error al actualizar el documento:', error);
		}
	}
};
	return {
		handleClickUpdate,
		handleUpdate,
		isPopupOpen,
		setIsPopupOpen,
		dataDocumento,
		setDataDocumento
	};
};

export default useEditDocumento;
