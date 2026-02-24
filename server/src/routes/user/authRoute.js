import express from "express";
import { body } from "express-validator";
import * as authController from "../../controllers/user/authController.js";

const router = express.Router();

// common validation rules for registration
const registerValidators = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  // you can add more checks for customer fields if desired
];

// register new customer + user
router.post("/register", registerValidators, authController.register);

// login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  authController.login,
);

export default router;
