"use strict";
import { Router } from "express";
import userRoutes from "./estudiante.routes.js";
import authRoutes from "./auth.routes.js";
import libroContableRoutes from "./libroContable.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/libro", libroContableRoutes);

export default router;