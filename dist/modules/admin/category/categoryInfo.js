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
exports.categoryInfo = void 0;
const prisma_1 = require("../../../utilis/prisma");
const categoryInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const catId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.wbId;
    console.log("catId", catId);
    try {
        const category = yield prisma_1.prisma.category.findFirst({
            where: {
                id: catId,
            },
            include: {
                posts: {
                    select: {
                        title: true,
                        content: true,
                        image: true,
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        if (category) {
            res.status(200).json(category);
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
exports.categoryInfo = categoryInfo;
