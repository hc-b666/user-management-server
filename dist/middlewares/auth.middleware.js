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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema_1 = require("../models/UserSchema");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield UserSchema_1.User.findById(decoded.id);
        if (user.isBlocked === true) {
            throw new Error("Not allowed");
        }
        next();
    }
    catch (err) {
        res.status(403).json({ err: err instanceof Error ? err.message : "Unauthorized" });
    }
});
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map