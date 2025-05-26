"use strict";
import Documento from "../entity/documento.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createDocumento({
  nombre,
  ID_CEE,
  archivoBase64,
  fechaSubida,
}) {
  try {
    const repo = AppDataSource.getRepository(Documento);
    const documento = repo.create({
      nombre,
      fechaSubida,
      archivoBase64,
      miembroCEE: { id: ID_CEE },
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
    const documentos = await repo.find({ relations: ["miembroCEE"] });
    return [documentos, null];
  } catch (error) {
    return [null, error.message];
  }
}

export async function getDocumento(id) {
  try {
    const repo = AppDataSource.getRepository(Documento);
    const documento = await repo.findOne({
      where: { id },
      relations: ["miembroCEE"],
    });
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
