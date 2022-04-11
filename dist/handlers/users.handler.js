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
var user_model_1 = require("../models/user.model");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var authorization_middleware_1 = __importDefault(require("../middleware/authorization.middleware"));
dotenv_1.default.config();
var user = new user_model_1.UserModel();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var createdUser, token, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.create({
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        password: req.body.password
                    })];
            case 1:
                createdUser = _a.sent();
                token = jsonwebtoken_1.default.sign(createdUser, TOKEN_SECRET);
                res.json(__assign(__assign({}, createdUser), { token: token }));
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).json("Cannot create user ".concat(req.body.name));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.index()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400).json("Cannot fetch users.");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requiredUser, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.show(Number(req.params.id))];
            case 1:
                requiredUser = _a.sent();
                res.json(requiredUser);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(404).json("Cannot fetch user ".concat(req.params.id));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedUser, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.update({
                        id: req.body.id,
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        password: req.body.password
                    })];
            case 1:
                updatedUser = _a.sent();
                res.json(updatedUser);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(400).json("Cannot update user ".concat(req.body.name));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedUser, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user.delete(Number(req.params.id))];
            case 1:
                deletedUser = _a.sent();
                res.json(deletedUser);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(404).json("Cannot delete user ".concat(req.params.id));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var usersHandler = function (app) {
    app.post('/users', create);
    app.get('/users', authorization_middleware_1.default, index);
    app.get('/users/:id', authorization_middleware_1.default, show);
    app.patch('/users', authorization_middleware_1.default, update);
    app.delete('/users/:id', authorization_middleware_1.default, deleteUser);
};
exports.default = usersHandler;
