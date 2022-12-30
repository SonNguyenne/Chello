import express from "express";
let router = express.Router();
import * as profileController from "../controllers/profile.controller";

router.get("/", profileController.index);

export { router as profileRouter };
