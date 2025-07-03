import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { onlyCEE } from "../middlewares/authorization.middleware.js";
import { 
    createMovimiento,
    deleteMovimiento,
    getMovimientosLibro,
    updateMovimiento
} from "../controllers/movimientosLibro.controller.js";

const router = Router();

router.use(authenticateJwt);
router.use(onlyCEE);

router.post("/", createMovimiento);           // http://localhost:3000/api/movimiento
router.get("/:libroId", getMovimientosLibro); // http://localhost:3000/api/movimiento/:libroId
router.patch("/:id", updateMovimiento);       // http://localhost:3000/api/movimiento/:id
router.delete("/:id", deleteMovimiento);      // http://localhost:3000/api/movimiento/:id

export default router;