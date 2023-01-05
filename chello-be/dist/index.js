"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var index_1 = require("./routes/index");
var firebase_1 = require("./configs/firebase");
var app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
(0, firebase_1.db)();
(0, index_1.webRoutes)(app);
app.get("/", function (req, res) {
    res.send("Hello");
});
app.listen(3001, function () {
    console.log("Link: http://localhost:".concat(3001));
});
//# sourceMappingURL=index.js.map