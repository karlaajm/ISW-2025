"use client";
import { useState } from "react";
import Form from "./Form";

export default function FormDocumento({ documento, onSave, onCancel }) {
	const [archivoBase64, setArchivoBase64] = useState(documento?.archivoBase64 || "");

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
			defaultValue: documento?.fechaSubida?.slice(0, 10) || "",
		},
		{
			label: "Archivo PDF",
			name: "archivo",
			fieldType: "input",
			type: "file",
			onChange: handleFileChange,
			required: !documento,
			accept: ".pdf"
		}
	];

	const handleSubmit = (data) => {
	console.log("Entró a handleSubmit");

	const base64Final = archivoBase64 || documento?.archivoBase64;

	if (!base64Final) {
		alert("Debes subir un archivo PDF.");
		return;
	}

	const payload = {
		nombre: data.nombre,
		fechaSubida: new Date(data.fechaSubida).toISOString(),
		archivoBase64: base64Final
	};

	console.log('Payload a enviar al backend:', payload);

	onSave(payload);
};


	return (
		<Form
			title={documento ? "Editar Documento" : "Nuevo Documento"}
			fields={fields}
			onSubmit={handleSubmit}
			buttonText={documento ? "Guardar Cambios" : "Subir Documento"}
			backgroundColor="#fff"
			footerContent={<button type="button" onClick={onCancel}>Cancelar</button>}
		/>
	);
}
