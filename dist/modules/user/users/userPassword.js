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
exports.userPassword = void 0;
const authenticate_1 = require("../../../utilis/authenticate");
const prisma_1 = require("../../../utilis/prisma");
const userPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const currentpass = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.passwordInfo) === null || _b === void 0 ? void 0 : _b.currentPassword;
    const newpass = (_d = (_c = req.body) === null || _c === void 0 ? void 0 : _c.passwordInfo) === null || _d === void 0 ? void 0 : _d.newPassword;
    //@ts-ignore
    const userId = req.userId;
    try {
        const user = yield prisma_1.prisma.user.findFirst({
            where: {
                id: userId,
            },
        });
        if (user) {
            const id = user === null || user === void 0 ? void 0 : user.id;
            const oldpass = user === null || user === void 0 ? void 0 : user.password;
            const hashCurrentPass = (0, authenticate_1.hashpassmethod)(currentpass);
            const hashNewPass = (0, authenticate_1.hashpassmethod)(newpass);
            if (oldpass === hashCurrentPass) {
                const updatePass = yield prisma_1.prisma.user.update({
                    where: {
                        id: id,
                    },
                    data: {
                        password: hashNewPass,
                    },
                });
                if (updatePass) {
                    res.status(200).json(updatePass);
                }
                else {
                    res.status(400).json(Error);
                }
            }
            else {
                console.log(Error);
                res.status(404).json("The password is wrong");
            }
        }
        else {
            res.status(401).json("user not found");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.userPassword = userPassword;
