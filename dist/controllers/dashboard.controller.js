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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsers = exports.unblockUsers = exports.blockUsers = void 0;
exports.getUsers = getUsers;
const UserSchema_1 = require("../models/UserSchema");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield UserSchema_1.User.find().select("-password -__v");
            res.status(200).json(users);
        }
        catch (err) {
            console.log(`catch ${err}`);
            res.status(500).json({ err: "Internal server error" });
        }
    });
}
;
const blockUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userIds } = req.body;
        yield Promise.all(userIds.map((id) => __awaiter(void 0, void 0, void 0, function* () {
            const u = yield UserSchema_1.User.findById(id);
            if (!u) {
                throw new Error(`${id} this kind of user is not defined.`);
            }
            u.isBlocked = true;
            yield u.save();
        })));
        res.status(200).json({ message: "Blocked successfully" });
    }
    catch (err) {
        console.log(`catch ${err}`);
        res.status(500).json({ err: "Internal server error" });
    }
});
exports.blockUsers = blockUsers;
const unblockUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userIds } = req.body;
        yield Promise.all(userIds.map((id) => __awaiter(void 0, void 0, void 0, function* () {
            const u = yield UserSchema_1.User.findById(id);
            if (!u) {
                throw new Error(`${id} this kind of user is not defined.`);
            }
            u.isBlocked = false;
            yield u.save();
        })));
        res.status(200).json({ message: "Unblocked successfully" });
    }
    catch (err) {
        console.log(`catch ${err}`);
        res.status(500).json({ err: "Internal server error" });
    }
});
exports.unblockUsers = unblockUsers;
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userIds } = req.body;
        yield Promise.all(userIds.map((id) => UserSchema_1.User.deleteOne({ _id: id })));
        res.status(200).json({ message: "Deleted successfully" });
    }
    catch (err) {
        console.log(`catch ${err}`);
        res.status(500).json({ err: "Internal server error" });
    }
});
exports.deleteUsers = deleteUsers;
