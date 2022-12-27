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
exports.getAdminInfo = void 0;
const prisma_1 = require("../../utilis/prisma");
const getAdminInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.query);
    const adId = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.query;
    try {
        const getInfo = yield prisma_1.prisma.admin.findMany({
            where: {
                id: adId,
            },
            select: {
                image: true,
                banner: true,
                name: true,
                family: true,
                bio: true,
                job: true,
            },
        });
        if (getInfo.length >= 1) {
            console.log("info", getInfo);
            res.status(200).json(getInfo[0]);
        }
        else {
            res.status(400).json(Error);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAdminInfo = getAdminInfo;
