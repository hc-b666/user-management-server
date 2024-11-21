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
exports.register = register;
exports.login = login;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema_1 = require("../models/UserSchema");
const jwt_1 = require("../utils/jwt");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                res.status(400).json({ err: "All inputs are required" });
            }
            const exists = yield UserSchema_1.User.findOne({ email });
            if (exists) {
                res.status(409).json({ err: "User already exists. Please login" });
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = new UserSchema_1.User({
                username,
                email,
                password: hashedPassword,
                lastSeen: Date.now(),
                isBlocked: false,
            });
            yield newUser.save();
            res.status(200).json({ message: "Successfully registered!" });
        }
        catch (err) {
            console.log(`catch: ${err}`);
            res.status(500).json({ err: "Internal server error" });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ err: "All inputs are required" });
            }
            const user = yield UserSchema_1.User.findOne({ email });
            if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
                res.status(400).json({ err: "Invalid credentials" });
            }
            const token = (0, jwt_1.createSecretToken)(user._id.toString());
            res.status(200).json({ message: "Succesfully logged in!", token });
        }
        catch (err) {
            console.log(`catch ${err}`);
            res.status(500).json({ err: "Internal server error" });
        }
    });
}
//# sourceMappingURL=auth.controller.js.map