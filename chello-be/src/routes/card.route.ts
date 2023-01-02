import express from "express";
let router = express.Router();
import * as cardController from "../controllers/card.controller";

router.get("/", cardController.index);

// router.get("/workspace/:id/card", cardController.index);


export { router as cardRouter };
