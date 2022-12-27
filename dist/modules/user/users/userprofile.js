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
exports.userProfile = void 0;
const prisma_1 = require("../../../utilis/prisma");
const checkdata_1 = require("../../../utilis/checkdata");
const userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, slug } = req.params;
        if (!id)
            return;
        const info = req.body.userData;
        //@ts-ignore
        const userId = req.userId;
        const value = (0, checkdata_1.dataValidation)(info);
        if (value == false) {
            res.status(401).json("data is empty");
        }
        const updatedata = yield prisma_1.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name: info.name,
                family: info.family,
                username: info.username,
                email: info.email,
                address: info.address,
                phoneNumber: info.phoneNumber,
                bio: info.bio,
                skill: info.skill,
                updatedAt: new Date().toISOString(),
            },
        });
        if (updatedata) {
            res.status(200).json(updatedata);
        }
        else {
            res.status(400).json("error update");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.userProfile = userProfile;
