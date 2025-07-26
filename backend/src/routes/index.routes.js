"use strict";
import { Router } from "express";
import userRoutes from "./estudiante.routes.js";
import authRoutes from "./auth.routes.js";
import libroContableRoutes from "./libroContable.routes.js";
import documentoRoutes from "./documento.routes.js";
import movimientosLibroRoutes from "./movimientosLibro.routes.js";

const router = Router();

router
  .use("/auth", authRoutes)
  .use("/user", userRoutes)
  .use("/libro", libroContableRoutes)
  .use("/documento", documentoRoutes)
  .use("/movimiento", movimientosLibroRoutes);

router.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "Ruta no encontrada",
  });
});

export default router;
