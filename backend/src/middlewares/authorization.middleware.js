import Estudiante from "../entity/estudiante.entity.js";
import { AppDataSource } from "../config/configDb.js";
import {
handleErrorClient,
handleErrorServer,
} from "../handlers/responseHandlers.js";

export function onlyCEE(req, res, next) {
  if (!req.user?.esCEE) {
    return handleErrorClient(res, 403, "Acceso solo para el Centro de Estudiantes");
  }
  next();
}