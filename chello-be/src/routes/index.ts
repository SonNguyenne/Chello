import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { dashboardRouter } from "./dashboard.route";
import { profileRouter } from "./profile.route";
import { workspaceRouter } from "./workspace.route";
import { authenticationRouter } from "./authentication.route";
let router = express.Router();

export const webRoutes = (app: any) => {
  app.use("/dashboard", dashboardRouter);
  app.use("/profile", profileRouter);
  app.use("/workspace", workspaceRouter);
  app.use("/authentication", authenticationRouter);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return app.use("/", router);
};
