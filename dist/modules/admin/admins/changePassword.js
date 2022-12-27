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
exports.changePassword = void 0;
const authenticate_1 = require("../../../utilis/authenticate");
const prisma_1 = require("../../../utilis/prisma");
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const passsword = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.adminPassword) === null || _b === void 0 ? void 0 : _b.currentpassword;
    const newpass = (_d = (_c = req.body) === null || _c === void 0 ? void 0 : _c.adminPassword) === null || _d === void 0 ? void 0 : _d.newpassword;
    const id = req.query.query;
    //@ts-ignore
    const usreId = req.userId;
    if (!passsword || !newpass || passsword.length == null) {
        res.status(404).json("data problem");
    }
    try {
        const findUser = yield prisma_1.prisma.admin.findFirst({
            where: {
                id: usreId,
            },
        });
        if (findUser) {
            const pass = findUser === null || findUser === void 0 ? void 0 : findUser.password;
            // hash pass
            const hashCurrentPass = (0, authenticate_1.hashpassmethod)(passsword);
            // hash new pass
            const hashNewPass = (0, authenticate_1.hashpassmethod)(newpass);
            const id = findUser === null || findUser === void 0 ? void 0 : findUser.id;
            if (pass === hashCurrentPass) {
                const updatepass = yield prisma_1.prisma.admin.update({
                    where: {
                        id: id,
                    },
                    data: {
                        password: hashNewPass,
                        updatedAt: new Date(),
                    },
                });
                if (updatepass) {
                    res.status(200).json("update password");
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
            res.status(402).json("user not found");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.changePassword = changePassword;
