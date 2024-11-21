"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSecretToken = createSecretToken;
const validateEnv_1 = __importDefault(require("./validateEnv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createSecretToken(id) {
    return jsonwebtoken_1.default.sign({ id }, validateEnv_1.default.TOKEN_KEY, {
        expiresIn: 60 * 60,
    });
}
;
//# sourceMappingURL=jwt.js.map