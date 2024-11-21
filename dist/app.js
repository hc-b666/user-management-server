"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost5173",
}));
app.use("/", (req, res) => {
    res.json({ message: "We got your request" });
});
app.use("/api/v1", routes_1.default);
app.use((req, res) => {
    res.status(404).json({ err: "Endpoint not found" });
});
exports.default = app;
