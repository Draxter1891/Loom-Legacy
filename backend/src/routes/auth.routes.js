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


/**
 * @method POST
 * @route /api/auth/register
 * @param req.body = {name, email, password, confirmPassword}
 */
authRoutes.post("/register", registerValidator, registerController);


/**
 * @method POST
 * @route /api/auth/login
 * @param req.body = {email, password} 
 * */ 
authRoutes.post("/login", loginValidator, loginController);


/**
 * @method POST
 * @route /api/auth/logout
 * @param cookies.refreshToken
 */
authRoutes.post("/logout", logoutController);


/**
 * @method POST
 * @route /api/auth/refresh-token
 * @param cookies.refreshToken
 */
authRoutes.post("/refresh-token", refreshController);


/**
 * @method GET
 * @access logged in user
 * @param req.headers.authorization = accessToken
 */
authRoutes.get("/me", authenticate, getProfileController);

export default authRoutes;
