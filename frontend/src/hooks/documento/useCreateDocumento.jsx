import { createDocumento } from '@services/documento.service';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert';

const useCreateDocumento = (fetchDocumentos, setIsPopupOpen) => {
  const handleCreate = async (formData) => {
    if (!formData.nombre || !formData.fecha_subida || !formData.archivo_base64) {
      showErrorAlert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    try {
      const nuevoDocumento = await createDocumento(formData);
      showSuccessAlert('¡Documento creado!', 'Se agregó correctamente.');
      await fetchDocumentos();
      setIsPopupOpen(false);
      return nuevoDocumento;
    } catch (error) {
      console.error('Error al crear documento:', error);
      const msg = error.response?.data?.message || 'No se pudo crear el documento.';
      showErrorAlert('Error', msg);
    }
  };

  return { handleCreate };
};

export default useCreateDocumento;
