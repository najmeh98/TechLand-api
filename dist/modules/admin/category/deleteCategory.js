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
exports.deleteCategory = void 0;
const prisma_1 = require("../../../utilis/prisma");
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("req", req);
    console.log("body", req.body);
    console.log("catId", req.query);
    try {
        const catId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.catId;
        const deleteCate = yield prisma_1.prisma.category.delete({
            where: {
                id: catId,
            },
        });
        if (deleteCate) {
            res.status(200).json(deleteCate);
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
exports.deleteCategory = deleteCategory;
