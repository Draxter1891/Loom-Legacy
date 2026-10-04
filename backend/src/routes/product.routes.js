import express from "express";
import {
  createProductController,
  getAllProductController,
} from "../controllers/products.controller.js";
import {
  authenticate,
  authenticateSeller,
} from "../middlewares/auth.middleware.js";
import { upload } from "../config/multer.storage.js";
import jsonParse from "../middlewares/jsonParse.js";
import { createProductValidator } from "../validators/product.validator.js";

const productRoutes = express.Router();

/**
 * @method POST
 * @route api/products/
 * @description creates a new products, images will be saved into imagekit server
 * @access seller
 * @param req.body = {title,description, price:{amount, currency},sizes:[{size,stock}]}
 */

productRoutes.post(
  "/",
  // Checking user authenticated or not
  authenticate,
  //Checking the user is seller or not
  authenticateSeller,
  //to read req.body for form-data type
  upload.array("images"),
  //normalize the price object and sizes array via JSON.parse
  jsonParse,
  //validate all the product details
  createProductValidator,
  //controller logic
  createProductController,
);

productRoutes.get("/get", authenticate, getAllProductController);

export default productRoutes;
