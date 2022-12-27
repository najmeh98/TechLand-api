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
exports.userValid = void 0;
const prisma_1 = require("../../../utilis/prisma");
const authenticate_1 = require("../../../utilis/authenticate");
const userValid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("uservalid", req.body);
    const id = (_a = req.body) === null || _a === void 0 ? void 0 : _a.id;
    //@ts-ignore
    const userId = req.userId;
    try {
        const userInfo = yield prisma_1.prisma.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                family: true,
                username: true,
                email: true,
                bio: true,
                skill: true,
                isAdmin: true,
                createdAt: true,
                address: true,
                phoneNumber: true,
                token: true,
            },
        });
        if (userInfo) {
            const userId = userInfo.id;
            const token = (0, authenticate_1.generateAcessToken)(userId);
            res.status(200).json(userInfo);
        }
        else {
            res.status(401).json("user not found");
        }
    }
    catch (error) {
        console.dir(error);
        res.status(500).json(error);
    }
});
exports.userValid = userValid;
