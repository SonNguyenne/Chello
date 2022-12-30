import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { dashboardRouter } from "./dashboard.route";
import { profileRouter } from "./profile.route";
import { workspaceRouter } from "./workspace.route";
import { authenticationRouter } from "./authentication.route";
const swaggerDocument = YAML.load(
  path.resolve(__dirname, "../../src/swagger.yaml")
);

let router = express.Router();

export const webRoutes = (app: any) => {
  app.use("/dashboard", dashboardRouter);
  app.use("/profile", profileRouter);
  app.use("/workspace", workspaceRouter);
  app.use("/authentication", authenticationRouter);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return app.use("/", router);
};
