"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/estudiante.controller.js";

const router = Router();

router
  .use(authenticateJwt)

  router.post("/",createUser);   // http://localhost:3000/api/user/
  router.get("/all",getUsers);   // http://localhost:3000/api/user/all
  router.get("/",getUser);   // http://localhost:3000/api/user?rut=...
  router.patch("/",updateUser);  // http://localhost:3000/api/user?rut=...
  router.delete("/",deleteUser); // http://localhost:3000/api/user?rut=...
export default router;