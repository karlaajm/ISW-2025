"use strict";
import {
  createDocumento as createDocumentoService,
  deleteDocumento as deleteDocumentoService,
  getDocumento as getDocumentoService,
  getDocumentos as getDocumentosService,
  updateDocumento as updateDocumentoService,
} from "../services/documento.service.js";

import {
  documentoBodyValidation,
  documentoQueryValidation,
} from "../validations/documento.validation.js";

import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

import { sendActaNotification } from "../helpers/email.helper.js";
import { getUsersService } from "../services/estudiante.service.js";

export async function createDocumento(req, res) {
  try {
    const { error } = documentoBodyValidation.validate(req.body);
    if (error) {
      return handleErrorClient(res, 400, "Error de validación", error.message);
    }

    const { nombre, ID_Estudiante, fecha_subida, archivo_base64 } = req.body;

    const [documento, err] = await createDocumentoService({
      nombre,
      ID_Estudiante,
      fechaSubida: fecha_subida,
      archivoBase64: archivo_base64,
    });

    if (err) return handleErrorClient(res, 400, "Error creando documento", err);
    try {
      const [users, usersErr] = await getUsersService();
      if (!usersErr && users && users.length > 0) {
        const emails = users.map((u) => u.email).filter(Boolean);
        if (emails.length > 0) {
          await sendActaNotification(emails, nombre);
        }
      }
    } catch (mailErr) {
      console.error("Error enviando notificación de acta:", mailErr);
    }
    handleSuccess(res, 201, "Documento creado con éxito", documento);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getDocumentos(req, res) {
  try {
    const [documentos, err] = await getDocumentosService();

    if (err) return handleSuccess(res, 200, "Documentos encontrados", []);

    handleSuccess(res, 200, "Documentos encontrados", documentos || []);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getDocumento(req, res) {
  try {
    const { error } = documentoQueryValidation.validate(req.params);
    if (error)
      return handleErrorClient(res, 400, "Error de validación", error.message);

    const { id } = req.params;
    const [documento, err] = await getDocumentoService(id);

    if (err) return handleErrorClient(res, 404, err);
    if (!documento)
      return handleErrorClient(res, 404, "Documento no encontrado");

    handleSuccess(res, 200, "Documento encontrado", documento);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateDocumento(req, res) {
  try {
    const { id } = req.params;
    const { error } = documentoBodyValidation.validate(req.body);
    if (error)
      return handleErrorClient(res, 400, "Error de validación", error.message);

    const { nombre, ID_Estudiante, fecha_subida, archivo_base64 } = req.body;

    const [actualizado, err] = await updateDocumentoService(id, {
      nombre,
      ID_Estudiante,
      fechaSubida: fecha_subida,
      archivoBase64: archivo_base64,
    });

    if (err)
      return handleErrorClient(res, 400, "Error actualizando documento", err);

    handleSuccess(res, 200, "Documento actualizado correctamente", actualizado);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteDocumento(req, res) {
  try {
    const { id } = req.params;
    const [eliminado, err] = await deleteDocumentoService(id);

    if (err)
      return handleErrorClient(res, 404, "Error eliminando documento", err);

    handleSuccess(res, 200, "Documento eliminado correctamente", eliminado);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
