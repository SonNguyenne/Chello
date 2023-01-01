import express from "express";
let router = express.Router();
import * as workspaceController from "../controllers/workspace.controller";

router.get("/", workspaceController.index);
router.post("/createWorkspace", workspaceController.createWorkspace);

export { router as workspaceRouter };
