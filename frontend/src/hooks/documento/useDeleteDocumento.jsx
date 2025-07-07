import { deleteDocumento } from '@services/documento.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteDocumento = (fetchDocumentos, setDataDocumento, setDocumentos) => {
	const handleDelete = async (dataDocumento) => {
		if (dataDocumento.length > 0) {
			try {
				const result = await deleteDataAlert();
				if (result.isConfirmed) {
					const response = await deleteDocumento(dataDocumento[0].id);

					if (response.status === 'Client error') {
						return showErrorAlert('Error', response.details);
					}

					showSuccessAlert('¡Eliminado!', 'El documento ha sido eliminado correctamente.');

					setDocumentos(prev => prev.filter(doc => doc.id !== dataDocumento[0].id));

					setDataDocumento([]);
				} else {
					showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
				}
			} catch (error) {
				console.error('Error al eliminar el documento:', error);
				showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el documento.');
			}
		}
	};

	return { handleDelete };
};

export default useDeleteDocumento;
