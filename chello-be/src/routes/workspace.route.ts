import express from "express";
let router = express.Router();
import * as workspaceController from "../controllers/workspace.controller";
import * as cardController from "../controllers/card.controller";
import * as itemController from "../controllers/item.controller";

router.get("/", workspaceController.getWorkspace);
router.post("/", workspaceController.createWorkspace);
router.put("/:workspaceId", workspaceController.updateWorkspace);
router.patch("/:workspaceId", workspaceController.patchWorkspace);
router.delete("/:workspaceId", workspaceController.deleteWorkspace);
router.get("/:workspaceId", workspaceController.getWorkspaceById);

router.get("/:workspaceId/card", cardController.getCard);
router.post("/:workspaceId/card", cardController.createCard);
router.put("/:workspaceId/card/:cardId", cardController.updateCard);
router.patch("/:workspaceId/card/:cardId", cardController.patchCard);
router.delete("/:workspaceId/card/:cardId", cardController.deleteCard);
router.get("/:workspaceId/card/:cardId", cardController.getCardById);

router.get("/:workspaceId/card/:cardId/item", itemController.getItem);
router.post("/:workspaceId/card/:cardId/item", itemController.createItem);
router.post("/:workspaceId/card/item", itemController.patchDndItem);
router.put("/:workspaceId/card/:cardId/item/:itemId", itemController.updateItem);
router.get("/:workspaceId/card/:cardId/item/:itemId", itemController.getItemById);
router.patch("/:workspaceId/card/:cardId/item/:itemId", itemController.patchItem);
router.delete("/:workspaceId/card/:cardId/item/:itemId", itemController.deleteItem);
export { router as workspaceRouter };
