"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_DB_TEST = _a.POSTGRES_DB_TEST, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASS = _a.POSTGRES_PASS, POSTGRES_PORT = _a.POSTGRES_PORT, NODE_ENV = _a.NODE_ENV;
var postgres = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: NODE_ENV === 'test' ? POSTGRES_DB_TEST : POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASS,
    port: parseInt(POSTGRES_PORT, 10),
    max: 2
});
exports.default = postgres;
