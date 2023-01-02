import express from "express";
let router = express.Router();
import * as workspaceController from "../controllers/workspace.controller";
import * as cardController from "../controllers/card.controller";

router.get("/", workspaceController.index);

router.post("/createWorkspace", workspaceController.createWorkspace);

router.get("/getWorkspace", workspaceController.getWorkspace);

router.put("/updateWorkspace/:wsId", workspaceController.updateWorkspace);

router.delete("/deleteWorkspace/:wsId", workspaceController.deleteWorkspace);

router.get("/:workspace/cards", cardController.getCards);

router.post("/:workspace/createCard", cardController.createCard);





export { router as workspaceRouter };
