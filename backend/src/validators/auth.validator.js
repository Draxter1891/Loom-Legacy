import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("name")
    .exists()
    .withMessage("Please provide name")
    .bail()
    .isString()
    .withMessage("Name should be in text format")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Name should not be empty")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage(
      "Name should be atleast 2 characters long and less than 50 characters",
    ),
  body("email")
    .exists()
    .withMessage("Please provide email address")
    .bail()
    .isString()
    .withMessage("Email must be text")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Email field can't be empty")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .bail()
    .toLowerCase(),
  body("password")
    .hide()
    .exists()
    .withMessage("Please provide the password")
    .bail()
    .isString()
    .withMessage("Password must be text")
    .bail()
    .custom((value) => value.trim().length > 0)
    .withMessage("Password can't be empty or only spaces")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long"),
  body("confirmPassword")
    .exists()
    .withMessage("Please confirm your password")
    .bail()
    .isString()
    .withMessage("Confirm password must be text")
    .bail()
    .notEmpty()
    .withMessage("Confirm password can't be empty")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }

      return true;
    }),
  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errors: error.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }

    next();
  },
];

export const loginValidator = [
  body("email")
    .exists()
    .withMessage("Email is Required")
    .bail()
    .isString()
    .withMessage("Email must be a String Value")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a String value")
    .bail()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password at least 6 character long"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid data",
        errors: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }

    next();
  },
];
