"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { onlyCEE } from "../middlewares/authorization.middleware.js";
import {
  createDocumento,
  deleteDocumento,
  getDocumento,
  getDocumentos,
  updateDocumento,
} from "../controllers/documento.controller.js";

const router = Router();


router.use(authenticateJwt);

router.get("/all", getDocumentos); // http://localhost:3000/api/documento/all
router.get("/:id", getDocumento); // http://localhost:3000/api/documento/:id
router.use(onlyCEE);
router.post("/", createDocumento); // http://localhost:3000/api/documento/
router.patch("/:id", updateDocumento); // http://localhost:3000/api/documento/:id
router.delete("/:id", deleteDocumento); // http://localhost:3000/api/documento/:id

export default router;
