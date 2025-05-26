"use strict";
import { EntitySchema } from "typeorm";

const MiembroCEESchema = new EntitySchema({
  name: "MiembroCEE",
  tableName: "Miembro_CEE",
  columns: {
    id: {
      name: "ID_CEE",
      type: "int",
      primary: true,
      generated: true,
    },
    carrera: {
      type: "varchar",
      nullable: true,
    },
    anio: {
      type: "int",
      nullable: true,
    },
  },
});

export default MiembroCEESchema;
