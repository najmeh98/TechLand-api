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
exports.EditUserInfo = void 0;
const checkdata_1 = require("../../../utilis/checkdata");
const prisma_1 = require("../../../utilis/prisma");
const EditUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body.userInfo;
        console.log(req.body);
        // check data
        const checkdata = (0, checkdata_1.dataValidation)(data);
        if (checkdata == false) {
            res.status(401).json("data problem");
        }
        const result = yield prisma_1.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                id: undefined,
                name: data.name,
                family: data.family,
                email: data.email,
                username: data.username,
                phoneNumber: data.phoneNumber,
                address: data.address,
                bio: data.bio,
                isAdmin: false,
                skill: data.skill,
                updatedAt: new Date().toISOString(),
            },
            select: {
                name: true,
                family: true,
                username: true,
                email: true,
                address: true,
                skill: true,
                bio: true,
                phoneNumber: true,
                updatedAt: true,
            },
        });
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(400).json("error");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.EditUserInfo = EditUserInfo;
