import { useEffect, useRef, useState } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator.min.css";
import '@styles/table.css';

function useTable({ data, columns, filter, dataToFilter, initialSortName, onSelectionChange }) {
    const tableRef = useRef(null);
    const [table, setTable] = useState(null);
    const [isTableBuilt, setIsTableBuilt] = useState(false);
	const esCEE = JSON.parse(sessionStorage.getItem('usuario'))?.esCEE;

    useEffect(() => {
        if (tableRef.current) {
            const updatedColumns = [
                { 
                    formatter: "rowSelection",
					visible: esCEE, 
                    titleFormatter: false, 
                    hozAlign: "center", 
                    headerSort: false, 
                    width: 36, // ancho fijo para el tick
                    cellClick: function (e, cell) {
                        cell.getRow().toggleSelect();
                    } 
                },
                ...columns
            ];
            const tabulatorTable = new Tabulator(tableRef.current, {
                data: [],
                columns: updatedColumns,
                layout: "fitDataTable",
                responsiveLayout: "collapse",
                pagination: true,
                paginationSize: 6,
                selectableRows: 1,
                rowHeight: 46,
                langs: {
                    "default": {
                        "pagination": {
                            "first": "Primero",
                            "prev": "Anterior",
                            "next": "Siguiente",
                            "last": "Último",
                        }
                    }
                },
                initialSort: [
                    { column: initialSortName, dir: "asc" }
                ],
            });
            tabulatorTable.on("rowSelectionChanged", function(selectedData) {
                if (onSelectionChange) {
                    onSelectionChange(selectedData);
                }
            });
            tabulatorTable.on("tableBuilt", function() {
                setIsTableBuilt(true);
            });
            setTable(tabulatorTable);
            return () => {
                tabulatorTable.destroy();
                setIsTableBuilt(false);
                setTable(null);
            };
        }
    }, []);

    useEffect(() => {
        if (table && isTableBuilt) {
            table.replaceData(data);
        }
    }, [data, table, isTableBuilt]);

    useEffect(() => {
        if (table && isTableBuilt) {
            if (filter) {
                table.setFilter(dataToFilter, "like", filter);
            } else {
                table.clearFilter();
            }
            table.redraw();
        }
    }, [filter, table, dataToFilter, isTableBuilt]);

    return { tableRef };
}
export default useTable;