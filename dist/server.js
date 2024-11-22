"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const app_1 = __importDefault(require("./app"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const PORT = validateEnv_1.default.PORT;
(0, dbConnection_1.default)();
app_1.default.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map