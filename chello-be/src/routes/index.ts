import express from "express";
import { dashboard } from "../controllers/DashboardController";
// import Joi from "joi"
let router = express.Router();

export const webRoutes = (app: any) => {
    router.get("/dashboard", dashboard);
    
    return app.use("/", router);
}
