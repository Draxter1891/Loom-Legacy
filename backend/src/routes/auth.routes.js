import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import {
  getProfileController,
  loginController,
  logoutController,
  refreshController,
  registerController,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerValidator, registerController);
authRoutes.post("/login", loginValidator, loginController);
authRoutes.post("/logout", logoutController);
authRoutes.post("/refresh-token", refreshController);
authRoutes.get("/me", authenticate, getProfileController);

export default authRoutes;
