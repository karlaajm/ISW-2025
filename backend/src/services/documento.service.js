"use strict";
import Documento from "../entity/documento.entity.js";
import Estudiante from "../entity/estudiante.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createDocumento({
  nombre,
  ID_Estudiante,
  archivoBase64,
  fechaSubida,
}) {
  try {
    const repo = AppDataSource.getRepository(Documento);
    const estudianteRepo = AppDataSource.getRepository(Estudiante);

    const estudiante = await estudianteRepo.findOneBy({ id: ID_Estudiante });
    if (!estudiante || !estudiante.esCEE) {
      return [null, "El estudiante no es miembro del CEE"];
    }

    const documento = repo.create({
      nombre,
      fechaSubida,
      archivoBase64,
      estudiante,
    });

    const nuevoDocumento = await repo.save(documento);
    return [nuevoDocumento, null];
  } catch (error) {
    return [null, error.message];
  }
}

export async function getDocumentos() {
  try {
    const repo = AppDataSource.getRepository(Documento);

    const documentos = await repo
      .createQueryBuilder("documento")
      .innerJoin("documento.estudiante", "estudiante")
      .select([
        "documento.id",
        "documento.nombre",
        "documento.fechaSubida",
        "documento.archivoBase64",
      ])
      .getMany();

    return [documentos, null];
  } catch (error) {
    return [null, error.message];
  }
}

export async function getDocumento(id) {
  try {
    const repo = AppDataSource.getRepository(Documento);

    const documento = await repo
      .createQueryBuilder("documento")
      .innerJoin("documento.estudiante", "estudiante")
      .where("documento.id = :id", { id })
      .select([
        "documento.id",
        "documento.nombre",
        "documento.fechaSubida",
        "documento.archivoBase64",
      ])
      .getOne();

    return [documento, null];
  } catch (error) {
    return [null, error.message];
  }
}

export async function updateDocumento(
  id,
  { nombre, ID_CEE, archivoBase64, fechaSubida },
) {
  try {
    const repo = AppDataSource.getRepository(Documento);
    const documento = await repo.findOneBy({ id });
    if (!documento) return [null, "Documento no encontrado"];

    documento.nombre = nombre ?? documento.nombre;
    documento.fechaSubida = fechaSubida ?? documento.fechaSubida;
    if (ID_CEE) documento.miembroCEE = { id: ID_CEE };
    documento.archivoBase64 = archivoBase64 ?? documento.archivoBase64;

    const actualizado = await repo.save(documento);
    return [actualizado, null];
  } catch (error) {
    return [null, error.message];
  }
}

export async function deleteDocumento(id) {
  try {
    const repo = AppDataSource.getRepository(Documento);
    const documento = await repo.findOneBy({ id });
    if (!documento) return [null, "Documento no encontrado"];

    await repo.remove(documento);
    return [true, null];
  } catch (error) {
    return [null, error.message];
  }
}
