"use strict";
import { useState, useCallback } from 'react';
import Navbar from "@components/Navbar.jsx";
import Table from "@components/Table";
import Search from "@components/Search";
import Popup from "@components/Popup";
import DeleteIcon from "@assets/deleteIcon.svg";
import UpdateIcon from "@assets/updateIcon.svg";
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

	const handleFilterChange = (e) => {
		setFilterNombre(e.target.value);
	};

	const handleSelectionChange = useCallback((selectedDocs) => {
		setDataDocumento(selectedDocs);
	}, [setDataDocumento]);

	const columns = [
		{ title: "Nombre", field: "nombre", width: 350 },
		{ title: "Fecha de subida", field: "fechaSubida", width: 200 },
		{ title: "ID", field: "id", width: 100 }
	];

	return (
		<div className='main-container'>
			<Navbar />
			<div className='table-container'>
				<div className='top-table' style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
    <h1 className='title-table' style={{ color: "#1a237e" }}>Documentos</h1>
    <div className='filter-actions' style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
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

        <button onClick={handleClickUpdate} disabled={dataDocumento.length === 0} style={{ background: "transparent", border: "none", cursor: dataDocumento.length === 0 ? "not-allowed" : "pointer" }}>
            {dataDocumento.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
            ) : (
                <img src={UpdateIcon} alt="edit" />
            )}
        </button>
        <button onClick={() => handleDelete(dataDocumento)} disabled={dataDocumento.length === 0} style={{ background: "transparent", border: "none", cursor: dataDocumento.length === 0 ? "not-allowed" : "pointer" }}>
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
			</div>

			<PopupWrapper show={isPopupOpen} setShow={setIsPopupOpen}>
			<FormDocumento
				documento={dataDocumento[0]}
				onSave={(formData) => {
					if (dataDocumento.length > 0) {
						/*linea 114*/ handleUpdate(formData);
					} else {
						handleCreate(formData);
					}
				}}
				onCancel={() => setIsPopupOpen(false)}
			/>
			</PopupWrapper>
		</div>
	);
}

