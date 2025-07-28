import { 
  createMovimientoService,
  deleteMovimientoService, 
  getHistorialMovimientosLibroService, 
  getMovimientosLibroService, 
  restaurarMovimientoService,
  updateMovimientoService,
} from "../services/movimientosLibro.service.js";

import { 
  libroIdValidation, 
  movimientoBodyValidation,
  movimientoIdValidation,
  movimientoUpdateValidation,
} from "../validations/movimientosLibro.validation.js";

import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

export async function createMovimiento(req, res) {
  try {
    const { body } = req;
    const { error } = movimientoBodyValidation.validate(body);

    if (error) {
      return handleErrorClient(res, 400, "Error de validación", error.message);
    }

    const [movimiento, movimientoError] = await createMovimientoService(body);

    if (movimientoError) {
      return handleErrorClient(res, 400, "Error creando movimiento", movimientoError);
    }

    handleSuccess(res, 201, "Movimiento creado correctamente", movimiento);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getMovimientosLibro(req, res) {
  try {
    const { libroId } = req.params;
    const [movimientos, movimientosError] = await getMovimientosLibroService(Number(libroId));
    if (movimientosError) return handleErrorClient(res, 400, "Error listando movimientos", movimientosError);

    handleSuccess(res, 200, "Movimientos obtenidos correctamente", movimientos);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateMovimiento(req, res) {
  try {
    const { id } = req.params;
    const { error } = movimientoUpdateValidation.validate(req.body);
    if (error) return handleErrorClient(res, 400, "Error de validación", error.message);

    const [movimiento, movimientoError] = await updateMovimientoService(Number(id), req.body);
    if (movimientoError) return handleErrorClient(res, 400, "Error editando movimiento", movimientoError);

    handleSuccess(res, 200, "Movimiento editado correctamente", movimiento);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteMovimiento(req, res) {
  try {
    const { id } = req.params;
    const { error } = movimientoIdValidation.validate({ id: Number(id) });
    if (error) return handleErrorClient(res, 400, "Error de validación", error.message);

    const [movimiento, movimientoError] = await deleteMovimientoService(Number(id));
    if (movimientoError) return handleErrorClient(res, 400, "Error eliminando movimiento", movimientoError);

    handleSuccess(res, 200, "Movimiento eliminado correctamente", movimiento);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getHistorialMovimientosLibro(req, res) {
  try {
    const { libroId } = req.params;
    const { error } = libroIdValidation.validate({ libroId: Number(libroId) });
    if (error) return handleErrorClient(res, 400, "Error de validación", error.message);

    const [movimientos, movimientosError] = await getHistorialMovimientosLibroService(Number(libroId));
    if (movimientosError) return handleErrorClient(res, 400, "Error listando historial", movimientosError);

    handleSuccess(res, 200, "Historial de movimientos obtenido correctamente", movimientos);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function restaurarMovimiento(req, res) {
  try {
    const { id } = req.params;
    
    const [movimiento, movimientoError] = await restaurarMovimientoService(Number(id));
    if (movimientoError) return handleErrorClient(res, 400, "Error restaurando movimiento", movimientoError);

    handleSuccess(res, 200, "Movimiento restaurado correctamente", movimiento);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}