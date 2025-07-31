"use client";
import { useState } from "react";
import Form from "./Form";

export default function FormDocumento({ documento, onSave, onCancel }) {
const [archivoBase64, setArchivoBase64] = useState(documento?.archivo_base64 ? `data:application/pdf;base64,${documento.archivo_base64}` : "");
const fechaInicial = documento?.fecha_subida && documento?.fecha_subida.length >= 10
  ? documento.fecha_subida.slice(0, 10)
  : (documento?.fechaSubida && documento?.fechaSubida.length >= 10 ? documento.fechaSubida.slice(0, 10) : "");
const today = new Date();
const offsetDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
console.log(offsetDate)
const localTodayDate = offsetDate.toISOString().slice(0, 10);

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = () => {
			setArchivoBase64(reader.result);
		};
		reader.readAsDataURL(file);
	};

const fields = [
  {
	label: "Nombre del documento",
	name: "nombre",
	fieldType: "input",
	type: "text",
	required: true,
	defaultValue: documento?.nombre || "",
	placeholder: "Ej: Acta Asamblea Abril"
  },
  {
	label: "Fecha de subida",
	name: "fechaSubida",
	fieldType: "input",
	type: "date",
	required: true,
	max: localTodayDate,
	defaultValue: fechaInicial,
	placeholder: fechaInicial || "YYYY-MM-DD"
  },
  {
	label: "Archivo PDF",
	name: "archivo",
	fieldType: "input",
	type: "file",
	onChange: handleFileChange,
	required: !documento,
	accept: ".pdf",
	render: documento && documento.archivo_base64
		? () => (
				<div style={{ marginTop: '16px', textAlign: 'center' }}>
					<a
						href={`data:application/pdf;base64,${documento.archivo_base64}`}
						download={documento.nombre ? documento.nombre + '.pdf' : 'documento.pdf'}
						style={{ display: 'inline-block', marginBottom: '8px', color: '#2a3a8c', fontWeight: 'bold', textDecoration: 'underline' }}
					>
						Descargar PDF actual
					</a>
					<div style={{ margin: '8px 0', color: '#2a3a8c', fontWeight: 'bold', fontSize: '1em' }}>
						<span role="img" aria-label="pdf">📄</span> Archivo PDF guardado
					</div>
					<div style={{ border: '1px solid #ccc', borderRadius: '6px', overflow: 'hidden', margin: '0 auto', width: '90%', maxWidth: '400px', height: '300px', background: '#f9f9f9' }}>
						<iframe
							title="Vista previa PDF"
							src={`data:application/pdf;base64,${documento.archivo_base64}`}
							width="100%"
							height="300px"
							style={{ border: 'none' }}
						/>
					</div>
				</div>
			)
		: undefined
  }
];

const handleSubmit = (data) => {
  const user = JSON.parse(sessionStorage.getItem('usuario'));
  const idEstudiante = user?.id || user?.ID_Estudiante || user?.ID;
  if (!idEstudiante) {
	alert('No se encontró el ID del estudiante en sessionStorage. Inicia sesión nuevamente.');
	return;
  }
  let archivoBase64Solo;
  if (archivoBase64) {
	if (!archivoBase64.startsWith('data:application/pdf;base64,')) {
	  alert('Debes seleccionar un archivo PDF válido antes de subir el documento.');
	  return;
	}
	archivoBase64Solo = archivoBase64.replace('data:application/pdf;base64,', '');
  } else if (documento?.archivo_base64) {
	archivoBase64Solo = documento.archivo_base64;
  }
  const documentoData = {
	nombre: data.nombre,
	fecha_subida: data.fechaSubida || fechaInicial,
	ID_Estudiante: Number(idEstudiante)
  };
  if (!documento && !archivoBase64Solo) {
	alert('Debes subir un archivo PDF.');
	return;
  }
  if (archivoBase64Solo) {
	documentoData.archivo_base64 = archivoBase64Solo;
  }
  onSave(documentoData);
};

	return (
	  <>
	{documento && documento.archivo_base64 && (
	  <div style={{ marginBottom: '24px', textAlign: 'center' }}>
		<a
		  href={`data:application/pdf;base64,${documento.archivo_base64}`}
		  download={documento.nombre ? documento.nombre + '.pdf' : 'documento.pdf'}
		  style={{ display: 'inline-block', marginBottom: '8px', color: '#2a3a8c', fontWeight: 'bold', textDecoration: 'underline' }}
		>
		  Descargar PDF actual
		</a>
		<div style={{ margin: '8px 0', color: '#2a3a8c', fontWeight: 'bold', fontSize: '1em' }}>
		  <span role="img" aria-label="pdf">📄</span> Archivo PDF guardado
		</div>
		<div style={{ border: '1px solid #ccc', borderRadius: '6px', overflow: 'hidden', margin: '0 auto', width: '90%', maxWidth: '400px', height: '300px', background: '#f9f9f9' }}>
		  {documento.archivo_base64.length > 100 ? (
			<iframe
			  title="Vista previa PDF"
			  src={`data:application/pdf;base64,${documento.archivo_base64}`}
			  width="100%"
			  height="300px"
			  style={{ border: 'none' }}
			/>
		  ) : (
			<div style={{ color: '#d32f2f', padding: '2rem' }}>
			  No se puede mostrar la vista previa del PDF.
			</div>
		  )}
		</div>
	  </div>
	)}
		<Form
		  title={documento ? "Editar Documento" : "Nuevo Documento"}
		  fields={fields}
		  onSubmit={handleSubmit}
		  buttonText={documento ? "Guardar Cambios" : "Subir Documento"}
		  backgroundColor="#fff"
		  footerContent={<button type="button" onClick={onCancel}>Cancelar</button>}
		/>
	  </>
	);

}
