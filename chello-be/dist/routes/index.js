"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webRoutes = void 0;
var express_1 = __importDefault(require("express"));
var DashboardController_1 = require("../controllers/DashboardController");
var router = express_1.default.Router();
var webRoutes = function (app) {
    router.get("/dashboard", DashboardController_1.dashboard);
    return app.use("/", router);
};
exports.webRoutes = webRoutes;
//# sourceMappingURL=index.js.map