import express from "express";
let router = express.Router();
import * as authController from "../controllers/authentication.controller";

router.get("/", authController.index);
router.post("/login", authController.login);
router.post("/signup", authController.signup);

export { router as authenticationRouter };
