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
exports.editCategory = void 0;
const checkdata_1 = require("../../../utilis/checkdata");
const main_services_1 = require("../../../utilis/main-services");
const prisma_1 = require("../../../utilis/prisma");
const editCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req", req);
    console.log("body", req.body);
    console.log("req.query", req.query);
    const catId = req.query.catId;
    const data = req.body;
    const name = data === null || data === void 0 ? void 0 : data.name;
    const description = data === null || data === void 0 ? void 0 : data.description;
    const value = (0, checkdata_1.dataValidation)(data);
    if (value == false) {
        res.status(401).json("data problem");
    }
    // const imgUrl:string = await uploadService(req,)
    const bucket = main_services_1.uploaderConfig.createCategory.bucket;
    const format = main_services_1.uploaderConfig.createCategory.format;
    const imgUrl = yield (0, main_services_1.uploadService)(req, bucket, format);
    try {
        const findCategory = yield prisma_1.prisma.category.findFirst({
            where: { id: catId },
        });
        console.log(findCategory);
        if (findCategory) {
            const editCat = yield prisma_1.prisma.category.update({
                where: {
                    id: catId,
                },
                data: {
                    id: undefined,
                    name: name,
                    description: description,
                    image: `${imgUrl}`,
                    updatedAt: new Date(),
                },
            });
            if (editCat) {
                res.status(200).json(editCat);
            }
            else {
                res.status(400).json(Error);
            }
        }
        else {
            res.status(404).json("category does not exicted");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.editCategory = editCategory;
