"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router.post("/",createUser);   // http://localhost:3000/api/user/
router.get("/all",getUsers);   // http://localhost:3000/api/user/all
router.get("/",getUser);       // http://localhost:3000/api/user?id=...&rut=...&correo=...
router.patch("/",updateUser);  // http://localhost:3000/api/user?id=...&rut=...&correo=...
router.delete("/",deleteUser); // http://localhost:3000/api/user?id=...&rut=...&correo=...
export default router;