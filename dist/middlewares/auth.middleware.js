"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(403).json({ err: "Not allowed" });
    }
    try {
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        if (!token) {
            throw new Error("Invalid Token");
        }
        const decoded = jsonwebtoken_1.default.verify(token, validateEnv_1.default.TOKEN_KEY);
        if (!decoded.exp || Date.now() >= decoded.exp * 1000) {
            throw new Error("Token expired");
        }
        next();
    }
    catch (err) {
        res.status(403).json({ err: err instanceof Error ? err.message : "Unauthorized" });
    }
};
exports.authMiddleware = authMiddleware;
