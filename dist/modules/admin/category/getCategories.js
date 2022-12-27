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
exports.getCategories = void 0;
const prisma_1 = require("../../../utilis/prisma");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const adminId = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.adminId;
    try {
        const getCategory = yield prisma_1.prisma.category.findMany({
            include: {
                posts: true,
            },
        });
        if (getCategory) {
            console.log("cat", getCategory);
            res.status(200).json(getCategory);
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
exports.getCategories = getCategories;
