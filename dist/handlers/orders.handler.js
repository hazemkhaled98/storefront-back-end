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
        while (_) try {
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
var authorization_middleware_1 = __importDefault(require("../middleware/authorization.middleware"));
var order_model_1 = require("../models/order.model");
var order = new order_model_1.OrderModel();
var showCurrent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var activeOrders, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order.showCurrent(Number(req.params.id))];
            case 1:
                activeOrders = _a.sent();
                res.json(activeOrders);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(404).json("No active orders for user ".concat(req.params.id));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var showCompleted = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var completedOrders, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order.showCompleted(Number(req.params.id))];
            case 1:
                completedOrders = _a.sent();
                res.json(completedOrders);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(404).json("No completed orders for user ".concat(req.params.id));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var ordersHandler = function (app) {
    app.get('/orders/active/:id', authorization_middleware_1.default, showCurrent);
    app.get('/orders/complete/:id', authorization_middleware_1.default, showCompleted);
};
exports.default = ordersHandler;
