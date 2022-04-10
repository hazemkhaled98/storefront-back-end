"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = __importDefault(require("dotenv"));
var products_handler_1 = __importDefault(require("./handlers/products.handler"));
var users_handler_1 = __importDefault(require("./handlers/users.handler"));
var orders_handler_1 = __importDefault(require("./handlers/orders.handler"));
dotenv_1.default.config();
var PORT = process.env.PORT || 3000;
// create an instance server
var app = (0, express_1.default)();
// HTTP request logger middleware
app.use((0, morgan_1.default)('short'));
// parse json
app.use(express_1.default.json());
// products handler
(0, products_handler_1.default)(app);
// users handler
(0, users_handler_1.default)(app);
//orders handler
(0, orders_handler_1.default)(app);
// add routing for / path
app.get('/', function (req, res) {
    res.json({
        message: 'Hello, World 🌍'
    });
});
// error handling for not specified routes
app.use(function (_req, res) {
    res.status(404).json({
        status: 'Not found',
        message: 'Seems like you are lost'
    });
});
// start express server
app.listen(PORT, function () {
    /* eslint-disable-next-line no-console */
    console.log("Server is starting at port:".concat(PORT));
});
exports.default = app;
