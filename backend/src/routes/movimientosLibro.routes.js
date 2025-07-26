import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { onlyCEE } from "../middlewares/authorization.middleware.js";
import { 
    createMovimiento,
    deleteMovimiento,
    getHistorialMovimientosLibro,
    getMovimientosLibro,
    restaurarMovimiento,
    updateMovimiento,
} from "../controllers/movimientosLibro.controller.js";

const router = Router();

router.use(authenticateJwt);
router.use(onlyCEE);

router
  .post("/", createMovimiento)           // http://localhost:3000/api/movimiento
  .get("/:libroId", getMovimientosLibro) // http://localhost:3000/api/movimiento/:libroId
  .get("/:libroId/historial", getHistorialMovimientosLibro) // http://localhost:3000/api/movimiento/:libroId/historial
  .patch("/:id", updateMovimiento)       // http://localhost:3000/api/movimiento/:idmovimiento
  .delete("/:id", deleteMovimiento)      // http://localhost:3000/api/movimiento/:idmovimiento
  .patch("/:id/restaurar", restaurarMovimiento); // http://localhost:3000/api/movimiento/:idmovimiento/restaurar

export default router;