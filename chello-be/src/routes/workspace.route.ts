import express from "express";
let router = express.Router();
import * as workspaceController from "../controllers/workspace.controller";

router.get("/", workspaceController.index);

router.post("/createWorkspace", workspaceController.createWorkspace);

router.get("/getWorkspace", workspaceController.getWorkspace);

router.put("/updateWorkspace/:wsId", workspaceController.updateWorkspace);

router.delete("/deleteWorkspace/:wsId", workspaceController.deleteWorkspace);


export { router as workspaceRouter };
