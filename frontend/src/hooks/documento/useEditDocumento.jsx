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
			/*linea 19*/ const updatedDoc = await updateDocumento(dataDocumento[0].id, updatedData);
			console.log('Respuesta API updateDocumento:', updatedDoc);
			showSuccessAlert('¡Actualizado!', 'El documento ha sido actualizado correctamente.');
			setIsPopupOpen(false);

			setDocumentos(prevDocs => prevDocs.map(doc => (
				doc.id === updatedDoc.id ? updatedDoc : doc
			)));

			setDataDocumento([]);
		} catch (error) {
			console.error('Error al actualizar el documento:', error);
			showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el documento.');
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
