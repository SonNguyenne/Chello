import express from "express";
let router = express.Router();
import * as dashboardController from "../controllers/dashboard.controller";

router.get("/", dashboardController.index);

export { router as dashboardRouter };
