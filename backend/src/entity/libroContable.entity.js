"use strict";
import { EntitySchema } from "typeorm";

const LibroContable = new EntitySchema({
    name: "LibroContable",
    tableName: "LibrosContables",
    columns: {
        id: {
        type: "int",
        primary: true,
        generated: true,
        },
        nombre: {
        type: "varchar",
        length: 255,
        unique: true,
        nullable: false,
        },
        totalGanancias: {
        type: "int",
        default: 0,
        nullable: false,
        },
        totalGastos: {
        type: "int",
        default: 0,
        nullable: false,
        },
        balanceGeneral: {
        type: "int",
        default: 0,
        nullable: false,
        },
        fechaCreacion: {
        type: "timestamp with time zone",
        default: () => "CURRENT_TIMESTAMP",
        nullable: false,
        },
        fechaActualizacion: {
        type: "timestamp with time zone",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
        nullable: false,
        },
    },
    indices: [
        {
        name: "IDX_LIBRO_CONTABLE_ID",
        columns: ["id"],
        unique: true,
        },
    ],
    });

export default LibroContable;