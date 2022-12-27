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
exports.getPosts = void 0;
const prisma_1 = require("../../utilis/prisma");
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const catId = req.query.catId;
    console.log("req", req);
    console.log("bd", req.body);
    console.log("catId", catId);
    try {
        const getposts = yield prisma_1.prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                image: true,
                categoryId: true,
                createdAt: true,
                updatedAt: true,
                admin: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        family: true,
                        createdAt: true,
                    },
                },
                category: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        if (getposts) {
            console.log(getposts);
            res.status(200).json(getposts);
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
exports.getPosts = getPosts;
