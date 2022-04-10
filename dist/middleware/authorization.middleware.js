"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var authorize = function (req, res, next) {
    try {
        var authHeader = req.get('Authorization');
        if (authHeader) {
            var bearer = authHeader.split(' ')[0];
            var token = authHeader.split(' ')[1];
            if (token && bearer === 'Bearer') {
                var verified = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
                if (verified) {
                    next();
                }
                else {
                    res.status(401).json('Invalid token');
                }
            }
            else {
                res.status(401).json('Invalid token type');
            }
        }
        else {
            res.status(401).json('No token has been sent');
        }
    }
    catch (err) {
        res.status(401).json('User is not authorized');
    }
};
exports.default = authorize;
