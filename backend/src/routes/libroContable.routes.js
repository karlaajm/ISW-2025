"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    createLibro,
    deleteLibro,
    getLibro,
    getLibros,
    updateLibro,
} from "../controllers/libroContable.controller.js";

const router = Router();

//router.use(authenticateJwt);

router.post("/", createLibro);           // http://localhost:3000/api/libro/
router.get("/all", getLibros);           // http://localhost:3000/api/libro/all
router.get("/:nombre", getLibro);        // http://localhost:3000/api/libro/:nombre 
router.patch("/:nombre", updateLibro);   // http://localhost:3000/api/libro/:nombre
router.delete("/:nombre", deleteLibro);  // http://localhost:3000/api/libro/:nombre

export default router;
