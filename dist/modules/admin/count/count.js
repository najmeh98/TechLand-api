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
exports.count = void 0;
const prisma_1 = require("../../../utilis/prisma");
const count = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //count of posts
        const postCount = yield prisma_1.prisma.post.count();
        // count of users
        const adminCount = yield prisma_1.prisma.admin.count();
        if (postCount || adminCount) {
            res.status(200).json({ postCount, adminCount });
        }
        else {
            res.status(400).json("There are no posts or user");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.count = count;
