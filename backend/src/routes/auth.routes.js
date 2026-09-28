import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerValidator, registerController);
authRoutes.post("/login", loginValidator, loginController);

export default authRoutes;
