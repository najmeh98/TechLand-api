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
exports.createCategory = void 0;
const checkdata_1 = require("../../../utilis/checkdata");
const main_services_1 = require("../../../utilis/main-services");
const prisma_1 = require("../../../utilis/prisma");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const name = data === null || data === void 0 ? void 0 : data.name;
    const description = data === null || data === void 0 ? void 0 : data.description;
    const value = (0, checkdata_1.dataValidation)(data);
    if (value == false) {
        res.status(403).json("data problem");
    }
    const bucket = main_services_1.uploaderConfig.createCategory.bucket;
    const format = main_services_1.uploaderConfig.createCategory.format;
    const imgUrl = yield (0, main_services_1.uploadService)(req, bucket, format);
    try {
        const createCate = yield prisma_1.prisma.category.create({
            data: {
                id: undefined,
                name: name,
                description: description,
                image: `${imgUrl}`,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            select: {
                name: true,
                description: true,
                image: true,
                id: true,
                createdAt: true,
                posts: {
                    select: {
                        id: true,
                        title: true,
                        content: true,
                        image: true,
                        categoryId: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        if (createCate) {
            res.status(200).json(createCate);
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
exports.createCategory = createCategory;
