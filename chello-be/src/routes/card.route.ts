import express from "express";
let router = express.Router();
import * as cardController from "../controllers/card.controller";

router.get("/", cardController.getCard);

export { router as cardRouter };
