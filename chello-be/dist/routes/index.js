"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webRoutes = void 0;
var express_1 = __importDefault(require("express"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var yamljs_1 = __importDefault(require("yamljs"));
var path_1 = __importDefault(require("path"));
var dashboard_route_1 = require("./dashboard.route");
var profile_route_1 = require("./profile.route");
var workspace_route_1 = require("./workspace.route");
var authentication_route_1 = require("./authentication.route");
var swaggerDocument = yamljs_1.default.load(path_1.default.resolve(__dirname, "../../src/swagger.yaml"));
var router = express_1.default.Router();
var webRoutes = function (app) {
    app.use("/dashboard", dashboard_route_1.dashboardRouter);
    app.use("/profile", profile_route_1.profileRouter);
    app.use("/workspace", workspace_route_1.workspaceRouter);
    app.use("/authentication", authentication_route_1.authenticationRouter);
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    return app.use("/", router);
};
exports.webRoutes = webRoutes;
//# sourceMappingURL=index.js.map