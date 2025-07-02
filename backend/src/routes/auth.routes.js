"use strict";
import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

const router = Router();

router
  .post("/login", login)       //http://localhost:3000/api/auth/login
  .post("/register", register) //http://localhost:3000/api/auth/register
  .post("/logout", logout);    //http://localhost:3000/api/auth/logout

export default router;