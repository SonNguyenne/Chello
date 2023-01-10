"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchDndItem = exports.patchItem = exports.getItemById = exports.deleteItem = exports.updateItem = exports.getItem = exports.createItem = void 0;
var lite_1 = require("firebase/firestore/lite");
var getItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, params, workspaceId, cardId, dataItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = (0, lite_1.getFirestore)();
                params = req.params;
                workspaceId = params.workspaceId;
                cardId = params.cardId;
                dataItem = [];
                return [4, (0, lite_1.getDocs)((0, lite_1.collection)(db, "workspace", workspaceId, "card", cardId, "item")).then(function (snap) {
                        snap.docs.map(function (doc) {
                            dataItem.push(__assign({ itemId: doc.id }, doc.data()));
                        });
                    })];
            case 1:
                _a.sent();
                return [2, res.json(__spreadArray([], dataItem, true))];
        }
    });
}); };
exports.getItem = getItem;
var createItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, params, workspaceId, cardId, dataItem, newItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = (0, lite_1.getFirestore)();
                params = req.params;
                workspaceId = params.workspaceId;
                cardId = params.cardId;
                dataItem = [];
                return [4, (0, lite_1.getDocs)((0, lite_1.collection)(db, "workspace", workspaceId, "card", cardId, "item")).then(function (snap) {
                        snap.docs.map(function (doc) {
                            dataItem.push(__assign({ itemId: doc.id }, doc.data()));
                        });
                    })];
            case 1:
                _a.sent();
                newItem = {
                    itemName: req.body.itemName,
                    index: dataItem.length == 0 ? 0 : dataItem.length,
                };
                return [4, (0, lite_1.addDoc)((0, lite_1.collection)(db, "workspace", workspaceId, "card", cardId, "item"), newItem)];
            case 2:
                _a.sent();
                return [2, res.json(newItem).status(200)];
        }
    });
}); };
exports.createItem = createItem;
var updateItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, params, workspaceId, cardId, itemId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = (0, lite_1.getFirestore)();
                params = req.params;
                workspaceId = params.workspaceId;
                cardId = params.cardId;
                itemId = params.itemId;
                return [4, (0, lite_1.setDoc)((0, lite_1.doc)(db, "workspace", workspaceId, "card", cardId, "item", itemId), __assign({}, req.body))
                        .then(function () {
                        return res.json(req.body);
                    })
                        .catch(function () {
                        return res.json({ message: "Cập nhật thất bại" });
                    })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
exports.updateItem = updateItem;
var getItemById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, params, workspaceId, cardId, itemId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = (0, lite_1.getFirestore)();
                params = req.params;
                workspaceId = params.workspaceId;
                cardId = params.cardId;
                itemId = params.itemId;
                return [4, (0, lite_1.getDoc)((0, lite_1.doc)((0, lite_1.collection)(db, "workspace", workspaceId, "card", cardId, "item"), itemId))
                        .then(function (snap) {
                        return res.json(snap.data()).status(200);
                    })
                        .catch(function (err) {
                        return res.json(err.status);
                    })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
exports.getItemById = getItemById;
var patchItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, params, workspaceId, cardId, itemId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = (0, lite_1.getFirestore)();
                params = req.params;
                workspaceId = params.workspaceId;
                cardId = params.cardId;
                itemId = params.itemId;
                return [4, (0, lite_1.updateDoc)((0, lite_1.doc)((0, lite_1.collection)(db, "workspace", workspaceId, "card", cardId, "item"), itemId), req.body)
                        .then(function () {
                        return res.json({ message: "Thay đổi thành công" }).status(200);
                    })
                        .catch(function () {
                        return res.json({ message: "Thay đổi thất bại" }).status(400);
                    })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
exports.patchItem = patchItem;
var deleteItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, params, workspaceId, cardId, itemId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = (0, lite_1.getFirestore)();
                params = req.params;
                workspaceId = params.workspaceId;
                cardId = params.cardId;
                itemId = params.itemId;
                return [4, (0, lite_1.deleteDoc)((0, lite_1.doc)(db, "workspace", workspaceId, "card", cardId, "item", itemId))
                        .then(function () {
                        return res.json({ message: "Xoá thành công" }).status(200);
                    })
                        .catch(function () {
                        return res.json({ message: "Xóa thất bại" }).status(400);
                    })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
exports.deleteItem = deleteItem;
var patchDndItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, params, workspaceId, source, destination, thanhlz, data, dataSource, data_1, indexStart_1, indexEnd_1, data_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = (0, lite_1.getFirestore)();
                params = req.params;
                workspaceId = params.workspaceId;
                source = req.body.source;
                destination = req.body.destination;
                return [4, (0, lite_1.getDocs)((0, lite_1.collection)(db, "workspace", workspaceId, "card", source.droppableId, 'item'))];
            case 1:
                data = _a.sent();
                data.docs.map(function (doc) {
                    console.log(doc.data(), doc.id, 'oasddddddddddddddddddddddddd');
                    if (source.index === doc.data().index) {
                        thanhlz = __assign({ itemId: doc.id }, doc.data());
                        return thanhlz;
                    }
                });
                console.log('check1', thanhlz);
                if (!(source.droppableId !== destination.droppableId)) return [3, 6];
                return [4, (0, lite_1.deleteDoc)((0, lite_1.doc)(db, "workspace", workspaceId, "card", source.droppableId, "item", thanhlz.itemId))];
            case 2:
                _a.sent();
                return [4, (0, lite_1.getDocs)((0, lite_1.collection)(db, "workspace", workspaceId, "card", source.droppableId, 'item'))];
            case 3:
                dataSource = _a.sent();
                dataSource.docs.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                    var data, indexTru;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                data = item.data();
                                if (data.index >= thanhlz.index) {
                                    indexTru = data.index === 0 ? 0 : data.index - 1;
                                    data.index = indexTru;
                                }
                                return [4, (0, lite_1.setDoc)((0, lite_1.doc)((0, lite_1.collection)(db, "workspace", workspaceId, "card", source.droppableId, "item"), item.id), data)];
                            case 1:
                                _a.sent();
                                return [2];
                        }
                    });
                }); });
                thanhlz.index = destination.index;
                return [4, (0, lite_1.getDocs)((0, lite_1.collection)(db, "workspace", workspaceId, "card", destination.droppableId, 'item'))];
            case 4:
                data_1 = _a.sent();
                data_1.docs.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                    var data, indexCong;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                data = item.data();
                                if (data.index >= thanhlz.index) {
                                    indexCong = data.index + 1;
                                    data.index = indexCong;
                                }
                                return [4, (0, lite_1.setDoc)((0, lite_1.doc)((0, lite_1.collection)(db, "workspace", workspaceId, "card", destination.droppableId, "item"), item.id), data)];
                            case 1:
                                _a.sent();
                                return [2];
                        }
                    });
                }); });
                return [4, (0, lite_1.addDoc)((0, lite_1.collection)(db, "workspace", workspaceId, "card", destination.droppableId, "item"), thanhlz)];
            case 5:
                _a.sent();
                return [3, 9];
            case 6:
                if (!(destination.droppableId === source.droppableId)) return [3, 9];
                console.log('thaglzzz trennn', thanhlz);
                console.log('destination.index trennn', destination.index);
                thanhlz.index = destination.index;
                console.log('thaglzzz', thanhlz);
                return [4, (0, lite_1.updateDoc)((0, lite_1.doc)((0, lite_1.collection)(db, "workspace", workspaceId, "card", source.droppableId, "item"), thanhlz.itemId), thanhlz)];
            case 7:
                _a.sent();
                indexStart_1 = source.index;
                indexEnd_1 = destination.index;
                return [4, (0, lite_1.getDocs)((0, lite_1.collection)(db, "workspace", workspaceId, "card", destination.droppableId, 'item'))];
            case 8:
                data_2 = _a.sent();
                data_2.docs.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                    var data, indexCong, indexCong;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                data = item.data();
                                if (indexStart_1 < indexEnd_1) {
                                    if (data.index > indexStart_1 && data.index <= indexEnd_1) {
                                        indexCong = data.index - 1;
                                        data.index = indexCong;
                                    }
                                }
                                else if (indexStart_1 > indexEnd_1) {
                                    if (data.index < indexStart_1 && data.index >= indexEnd_1) {
                                        indexCong = data.index + 1;
                                        data.index = indexCong;
                                    }
                                }
                                return [4, (0, lite_1.setDoc)((0, lite_1.doc)((0, lite_1.collection)(db, "workspace", workspaceId, "card", destination.droppableId, "item"), item.id), data)];
                            case 1:
                                _a.sent();
                                return [2];
                        }
                    });
                }); });
                _a.label = 9;
            case 9: return [2];
        }
    });
}); };
exports.patchDndItem = patchDndItem;
//# sourceMappingURL=item.controller.js.map