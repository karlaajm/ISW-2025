"use strict";
import { useState, useCallback } from 'react';
import Navbar from "@components/Navbar.jsx";
import Table from "@components/Table";
import Search from "@components/Search";
import Popup from "@components/Popup";
import DeleteIcon from "@assets/deleteIcon.svg";
import UpdateIcon from "@assets/updateIcon.svg";
import DownloadIcon from "@assets/DownloadIcon.svg?raw";
import DeleteIconDisable from "@assets/deleteIconDisabled.svg";
import UpdateIconDisable from "@assets/updateIconDisabled.svg";

import useDocumentos from '@hooks/documento/useGetDocumentos';
import useDeleteDocumento from '@hooks/documento/useDeleteDocumento';
import useEditDocumento from '@hooks/documento/useEditDocumento';
import useCreateDocumento from '@hooks/documento/useCreateDocumento';

import PopupWrapper from '@components/PopupWrapper';
import FormDocumento from '@components/FormDocumento';


export default function DocumentosPage() {
	const { documentos, fetchDocumentos, setDocumentos } = useDocumentos();
	const [filterNombre, setFilterNombre] = useState('');
	const {
		handleClickUpdate,
		handleUpdate,
		isPopupOpen,
		setIsPopupOpen,
		dataDocumento,
		setDataDocumento
	} = useEditDocumento(setDocumentos);
	const { handleDelete } = useDeleteDocumento(fetchDocumentos, setDataDocumento, setDocumentos);
	const { handleCreate } = useCreateDocumento(fetchDocumentos, setIsPopupOpen);
	const esCEE = JSON.parse(sessionStorage.getItem('usuario'))?.esCEE;

	const handleFilterChange = (e) => {
		setFilterNombre(e.target.value);
	};

	const handleSelectionChange = useCallback((selectedDocs) => {
		setDataDocumento(selectedDocs);
	}, [setDataDocumento]);

	const columns = [
		{ title: "Nombre", field: "nombre", width: 520 },
		{ title: "Fecha de subida", field: "fechaSubida", width: 200 },
		{ 
			title: "Descargar", field: "descargarPDF",
      		formatter: function (cell) {
				const rowData = cell.getRow().getData();

				const wrapper = document.createElement("div");
				wrapper.style.display = "flex";
				wrapper.style.justifyContent = "center";
				wrapper.style.alignItems = "center";
				wrapper.style.width = "100%";
				wrapper.style.height = "100%";

        		const link = document.createElement("a");
        		link.href = `data:application/pdf;base64,${rowData.archivoBase64}`;
        		link.download = `${rowData.nombre}.pdf`;
				link.style = "color: #1a237e; background: transparent; border-radius: 6px; cursor: pointer; padding: 0.2rem; width: 24px; height: 24px;";
				link.onmouseenter = () => {
  					link.style.backgroundColor = "#1a237e";
					const svg = link.querySelector("svg");
      				if (svg) svg.setAttribute("fill", "#ffffff");
				};
				link.onmouseleave = () => {
  					link.style.backgroundColor = "transparent";
					const svg = link.querySelector("svg");
      				if (svg) svg.setAttribute("fill", "#1a237e");
				};
				link.target = "_blank";
				link.innerHTML = DownloadIcon;

				wrapper.append(link);
				return wrapper;
			},
      		headerHozAlign: "center",
			headerSort: false,
      		width: 170
    	}
	];

	return (
		<div className='main-container' style={{ marginTop: '80px', padding: '20px', background: '#e3f0ff', minHeight: '100vh' }}>
			<Navbar />
			<div className='table-container' style={{
				maxWidth: 950,
				margin: "5rem auto 4rem auto",
				background: "#fff",
				borderRadius: "18px",
				boxShadow: "0 4px 32px rgba(30,40,100,0.18)",
				padding: "3.5rem 2.5rem 2.5rem 3.5rem",
				borderLeft: "8px solid #1a237e",
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start"
			}}>
				<div className='top-table' style={{ marginBottom: "2.5rem", width: "100%", paddingLeft: "0px" }}>
					<h1 className='title-table' style={{ color: "#1a237e", fontSize: "2.6rem", fontWeight: 700, marginBottom: "2.2rem", letterSpacing: "1px", textAlign: "left", marginLeft: "0px" }}>Documentos</h1>
					<div className='filter-actions' style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginLeft: "0px" }}>
						<Search
							value={filterNombre}
							onChange={handleFilterChange}
							placeholder={'Filtrar por nombre'}
						/>
						<button
							onClick={() => {
								setDataDocumento([]);
								setIsPopupOpen(true);
							}}
							hidden={!esCEE}
							style={{
								background: "#1a237e",
								color: "#fff",
								border: "none",
								borderRadius: "6px",
								padding: "0.5rem 1.2rem",
								fontWeight: 600,
								fontSize: "1rem",
								cursor: "pointer",
								boxShadow: "0 2px 8px rgba(26,35,126,0.3)",
								transition: "background-color 0.3s ease"
							}}
							onMouseEnter={e => e.currentTarget.style.backgroundColor = "#162a66"}
							onMouseLeave={e => e.currentTarget.style.backgroundColor = "#1a237e"}
						>
							+ Nuevo Documento
						</button>
						<button
							onClick={handleClickUpdate}
							hidden={!esCEE}
							disabled={dataDocumento.length === 0}
							style={{ background: "transparent", border: "none", cursor: dataDocumento.length === 0 ? "not-allowed" : "pointer", padding: "0.2rem" }}
							onMouseEnter={e => {
								if (dataDocumento.length > 0) e.currentTarget.style.background = "#e3f0ff";
							}}
							onMouseLeave={e => {
								e.currentTarget.style.background = "transparent";
							}}
						>
							{dataDocumento.length === 0 ? (
								<img src={UpdateIconDisable} alt="edit-disabled" />
							) : (
								<img src={UpdateIcon} alt="edit" />
							)}
						</button>
						<button
							onClick={() => handleDelete(dataDocumento)}
							hidden={!esCEE}
							disabled={dataDocumento.length === 0}
							style={{ background: "transparent", border: "none", cursor: dataDocumento.length === 0 ? "not-allowed" : "pointer", padding: "0.2rem" }}
							onMouseEnter={e => {
								if (dataDocumento.length > 0) e.currentTarget.style.background = "#e3f0ff";
							}}
							onMouseLeave={e => {
								e.currentTarget.style.background = "transparent";
							}}
						>
							{dataDocumento.length === 0 ? (
								<img src={DeleteIconDisable} alt="delete-disabled" />
							) : (
								<img src={DeleteIcon} alt="delete" />
							)}
						</button>
					</div>
				</div>
				<Table
					data={documentos}
					columns={columns}
					filter={filterNombre}
					dataToFilter={'nombre'}
					initialSortName={'nombre'}
					onSelectionChange={handleSelectionChange}
				/>
				<PopupWrapper show={isPopupOpen} setShow={setIsPopupOpen}>
					<FormDocumento
						documento={dataDocumento[0]}
						onSave={(formData) => {
							if (dataDocumento.length > 0) {
								handleUpdate(formData);
							} else {
								handleCreate(formData);
							}
						}}
						onCancel={() => setIsPopupOpen(false)}
					/>
				</PopupWrapper>
			</div>
		</div>
	);
}

