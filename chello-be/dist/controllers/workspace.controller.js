"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkspace = exports.updateWorkspace = exports.getWorkspace = exports.createWorkspace = exports.index = void 0;
var lite_1 = require("firebase/firestore/lite");
var lodash_1 = __importDefault(require("lodash"));
var index = function (req, res) {
    res.send("workspace index");
};
exports.index = index;
var createWorkspace = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, newWs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = (0, lite_1.getFirestore)();
                newWs = {
                    isPublic: req.body.isPublic,
                    isFavorite: req.body.isFavorite,
                    workspaceName: req.body.workspaceName
                };
                return [4, (0, lite_1.addDoc)((0, lite_1.collection)(db, "workspace"), newWs)];
            case 1:
                _a.sent();
                return [2, res.json(newWs)];
        }
    });
}); };
exports.createWorkspace = createWorkspace;
var getWorkspace = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, data, citiesCol, citySnapshot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = (0, lite_1.getFirestore)();
                data = [];
                citiesCol = (0, lite_1.collection)(db, 'workspace');
                return [4, (0, lite_1.getDocs)(citiesCol)];
            case 1:
                citySnapshot = _a.sent();
                citySnapshot.docs.map(function (doc) {
                    data.push({
                        workspaceId: doc.id,
                        isPublic: doc.data().isPublic,
                        isFavorite: doc.data().isFavorite,
                        workspaceName: doc.data().workspaceName
                    });
                });
                return [2, res.json(data)];
        }
    });
}); };
exports.getWorkspace = getWorkspace;
var updateWorkspace = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = (0, lite_1.getFirestore)();
                return [4, (0, lite_1.setDoc)((0, lite_1.doc)(db, "workspace", req.params.wsId), {
                        isPublic: req.body.isPublic,
                        isFavorite: req.body.isFavorite,
                        workspaceName: req.body.workspaceName
                    })];
            case 1:
                _a.sent();
                return [2, res.json(lodash_1.default.omit(req.body, 'wsId'))];
        }
    });
}); };
exports.updateWorkspace = updateWorkspace;
var deleteWorkspace = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = (0, lite_1.getFirestore)();
                return [4, (0, lite_1.deleteDoc)((0, lite_1.doc)(db, "workspace", req.params.wsId))];
            case 1:
                _a.sent();
                return [2, res.json('deleted successfully')];
        }
    });
}); };
exports.deleteWorkspace = deleteWorkspace;
//# sourceMappingURL=workspace.controller.js.map