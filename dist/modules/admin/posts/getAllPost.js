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
exports.GetAllPost = void 0;
const prisma_1 = require("../../../utilis/prisma");
const GetAllPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //@ts-ignore
    // const adminId = req.adminId;
    const adminId = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.adminId;
    try {
        const adminPost = yield prisma_1.prisma.admin.findFirst({
            where: {
                id: adminId,
            },
            select: {
                post: {
                    select: {
                        title: true,
                        content: true,
                        image: true,
                        createdAt: true,
                        updatedAt: true,
                        id: true,
                        categoryId: true,
                        category: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        if (adminPost) {
            res.status(200).json(adminPost);
        }
        else {
            res.status(400).json("No post found");
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.GetAllPost = GetAllPost;
/**
 * TODO
 * - add get router for get all posts
 * -
 * -
 */
