"use strict";
import { EntitySchema } from "typeorm";

const Movimiento = new EntitySchema({
    name: "Movimiento",
    tableName: "Movimientos",
    columns: {
        id: {
        type: "int",
        primary: true,
        generated: true,
        },
        monto: {
        type: "int",
        nullable: false,
        },
        descripcion: {
        type: "varchar",
        length: 255,
        nullable: false,
        },
        tipo: {
        type: "enum",
        enum: ["gasto", "ganancia"],
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
    relations: {
        libroContable: {
            type: "many-to-one",
            target: "LibroContable",
            joinColumn: true,
            nullable: false,
            onDelete: "CASCADE",
        },
    },
});

export default Movimiento;