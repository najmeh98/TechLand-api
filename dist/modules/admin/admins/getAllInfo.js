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
exports.GetallInfo = void 0;
const prisma_1 = require("../../../utilis/prisma");
const GetallInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const adId = req.userId;
    try {
        //get all admin info
        const adInfo = yield prisma_1.prisma.admin.findFirst({
            where: {
                id: adId,
            },
            select: {
                id: true,
                name: true,
                family: true,
                username: true,
                email: true,
                address: true,
                phoneNumber: true,
                bio: true,
                job: true,
                token: true,
                image: true,
                banner: true,
                createdAt: true,
                post: {
                    select: {
                        title: true,
                        content: true,
                        image: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        if (adInfo) {
            res.status(200).json({ adInfo });
        }
        else {
            res.status(400).json(Error);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.GetallInfo = GetallInfo;
