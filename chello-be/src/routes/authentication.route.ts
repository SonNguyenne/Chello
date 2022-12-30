import express from "express";
let router = express.Router();
import * as authController from "../controllers/authentication.controller";

router.get("/", authController.index);

export { router as authenticationRouter };
