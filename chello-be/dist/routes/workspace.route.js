"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workspaceRouter = void 0;
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
exports.workspaceRouter = router;
var workspaceController = __importStar(require("../controllers/workspace.controller"));
var cardController = __importStar(require("../controllers/card.controller"));
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
//# sourceMappingURL=workspace.route.js.map