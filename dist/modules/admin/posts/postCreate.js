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
exports.postCreate = exports.upload = void 0;
const prisma_1 = require("../../../utilis/prisma");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const main_services_1 = require("../../../utilis/main-services");
const getDirImage = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    return `./upload/images/${year}/${month}/${day}`;
};
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const dir = getDirImage();
        fs_1.default.mkdirSync(dir, { recursive: true });
        return cb(null, dir);
    },
    filename: (req, file, cb) => {
        // save in database
        const filepath = `${getDirImage()}/${file.originalname}`;
        // if (!fs.existsSync(filepath)) {
        cb(null, file.originalname);
        req.body.filepath = filepath;
        // } else {
        // cb(null, `${Date.now()} - ${file.originalname}`);
        // }
    },
});
exports.upload = (0, multer_1.default)({
    storage: fileStorage,
    limits: { fileSize: 1024 * 1024 * 5 },
}).single("file");
const postCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bucket = main_services_1.uploaderConfig.createImage.bucket;
    const format = main_services_1.uploaderConfig.createImage.format;
    console.log("files", req.files);
    console.log("body", req.body);
    const title = req.body.title;
    const content = req.body.content;
    const catId = req.body.catId;
    const imgUrl = yield (0, main_services_1.uploadService)(req, bucket, format);
    try {
        const newPost = yield prisma_1.prisma.post.create({
            data: {
                id: undefined,
                title: title,
                content: content,
                image: `${imgUrl}`,
                published: false,
                // categoryId: catId,
                createdAt: new Date(),
                updatedAt: new Date(),
                admin: {
                    //@ts-ignore
                    connect: { id: req.userId },
                },
                category: {
                    connect: {
                        id: catId,
                    },
                },
            },
            select: {
                id: true,
                title: true,
                content: true,
                image: true,
                published: true,
                createdAt: true,
            },
        });
        console.log(newPost);
        if (newPost) {
            res.status(200).json(newPost);
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
exports.postCreate = postCreate;
