import express from "express";
let router = express.Router();
import * as workspaceController from "../controllers/workspace.controller";
import * as cardController from "../controllers/card.controller";

router.get("/:workspace/cards", cardController.getCards);

router.post("/:workspace/createCard", cardController.createCard);

router.patch("/:id", workspaceController.patchWorkspace);

router.delete("/:id", workspaceController.deleteWorkspace);

router.put("/:id", workspaceController.updateWorkspace);

router.post("/", workspaceController.createWorkspace);

router.get("/:id", workspaceController.getWorkspaceById);

router.get("/", workspaceController.getWorkspace);

export { router as workspaceRouter };
