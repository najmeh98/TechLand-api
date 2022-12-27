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
exports.getPostInfo = void 0;
const prisma_1 = require("../../utilis/prisma");
const getPostInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("req", req);
    const psId = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.query;
    try {
        const post = yield prisma_1.prisma.post.findFirst({
            where: {
                id: psId,
            },
            select: {
                image: true,
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                admin: {
                    select: {
                        family: true,
                        name: true,
                        image: true,
                        id: true,
                        job: true,
                        email: true,
                    },
                },
            },
        });
        if (post) {
            res.status(200).json(post);
        }
        else {
            res.status(400).json(Error);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getPostInfo = getPostInfo;
