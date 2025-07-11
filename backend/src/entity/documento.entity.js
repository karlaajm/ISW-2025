import { EntitySchema } from "typeorm";

const DocumentoSchema = new EntitySchema({
  name: "Documento",
  tableName: "Documento",
  columns: {
    id: {
      name: "ID_Doc",
      type: "int",
      primary: true,
      generated: true,
    },
    nombre: {
      type: "varchar",
      nullable: false,
    },
    fechaSubida: {
      name: "fecha_subida",
      type: "date",
      default: () => "CURRENT_DATE",
      nullable: false,
    },
    archivoBase64: {
      name: "archivo_base64",
      type: "text",
      nullable: true,
    },
  },
  relations: {
    estudiante: {
      type: "many-to-one",
      target: "Estudiante",
      joinColumn: {
        name: "ID_Estudiante",
      },
      nullable: false,
      eager: true,
    },
  },
  indices: [
    {
      name: "IDX_DOCUMENTO_ID",
      columns: ["id"],
      unique: true,
    },
  ],
});

export default DocumentoSchema;
