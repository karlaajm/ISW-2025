"use strict";
import {
  createLibroContable,
  deleteLibroContable,
  getLibroContable,
  getLibrosContables,
  updateLibroContable,
} from "../services/libroContable.service.js";
import {
  libroContableBodyValidation,
  libroContableQueryValidation,
} from "../validations/libroContable.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function createLibro(req, res) {
  try {
    const { error } = libroContableBodyValidation.validate(req.body);
    if (error)
      return handleErrorClient(res, 400, "Error de validación", error.message);

    const { nombre } = req.body;
    const [libro, err] = await createLibroContable(nombre);

    if (err) return handleErrorClient(res, 400, "Error creando libro contable", err);

    handleSuccess(res, 201, "Libro contable creado con éxito", libro);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getLibros(req, res) {
  try {
    const [libros, err] = await getLibrosContables();

    if (err) return handleErrorClient(res, 404, err);

    libros.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Libros contables encontrados", libros);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getLibro(req, res) {
  try {
    const { error } = libroContableQueryValidation.validate(req.query);
    if (error)
      return handleErrorClient(res, 400, "Error de validación", error.message);

    const { nombre } = req.params;
    const [libro, err] = await getLibroContable(nombre);

    if (err) return handleErrorClient(res, 404, err);
    if (!libro) return handleErrorClient(res, 404, "Libro contable no encontrado");

    handleSuccess(res, 200, "Libro contable encontrado", libro);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateLibro(req, res) {
  try {
    const { nombre } = req.params;
    const { error } = libroContableBodyValidation.validate(req.body);
    if (error)
      return handleErrorClient(res, 400, "Error de validación", error.message);

    const { nombre: nuevoNombre } = req.body;
    const [actualizado, err] = await updateLibroContable(nombre, nuevoNombre);

    if (err) return handleErrorClient(res, 400, "Error actualizando libro contable", err);

    handleSuccess(res, 200, "Libro contable actualizado correctamente", actualizado);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteLibro(req, res) {
  try {
    const { nombre } = req.params;
    const [ok, err] = await deleteLibroContable(nombre);

    if (err) return handleErrorClient(res, 404, "Error eliminando libro contable", err);

    handleSuccess(res, 200, "Libro contable eliminado correctamente", ok);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}