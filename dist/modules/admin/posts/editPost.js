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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPost = void 0;
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../../../utilis/prisma");
const main_services_1 = require("../../../utilis/main-services");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)()); // Don't forget this line!
const EditPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const psId = req.query.postId;
        const title = req.body.title;
        const content = req.body.content;
        const files = req.files;
        const bucket = main_services_1.uploaderConfig.createImage.bucket;
        const format = main_services_1.uploaderConfig.createImage.format;
        const imgUrl = yield (0, main_services_1.uploadService)(req, bucket, format);
        const findpost = yield prisma_1.prisma.post.findFirst({
            where: { id: psId },
        });
        if (findpost) {
            const editpost = yield prisma_1.prisma.post.update({
                where: { id: psId },
                data: {
                    id: undefined,
                    title: title,
                    content: content,
                    image: `${imgUrl}`,
                    published: false,
                    updatedAt: new Date(),
                },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    image: true,
                    updatedAt: true,
                    published: true,
                },
            });
            if (editpost) {
                res.status(200).json(editpost);
            }
            else {
                res.status(400).json(Error);
            }
        }
        else {
            res.status(404).json("post does not exicted");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.EditPost = EditPost;
// ******
//TODO
// 1. find post
// 2. check if post existed send for update
// *****
