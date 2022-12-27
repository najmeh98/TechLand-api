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
exports.uploadService = exports.uploaderConfig = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const crypto_1 = require("crypto");
const spaceEndpoint = new aws_sdk_1.default.Endpoint("https://s3.ir-thr-at1.arvanstorage.com");
const accesskeyid = process.env.UPLOADER_ACCESS_KEY;
const secretkey = process.env.UPLOADER_SECRET_ACCESSKEY;
const s3 = new aws_sdk_1.default.S3({
    endpoint: spaceEndpoint,
    accessKeyId: accesskeyid,
    secretAccessKey: secretkey,
});
// bucket
exports.uploaderConfig = {
    createImage: { bucket: "postimage", format: "jpg" },
    createCategory: { bucket: "categoriesimage", format: ".jpg" },
    createProfile: { bucket: "profileimage", format: ".jpg" },
    createBanner: { bucket: "bannerimage", format: ".jpg" },
};
const uploadService = (req, bucket, format) => __awaiter(void 0, void 0, void 0, function* () {
    const date = Date();
    const hashKey = process.env.UPLEADER_HASH_KEY;
    // Initializing the createHmac method using secret
    // data to be encoded
    // Defining encoding
    const filename = (0, crypto_1.createHmac)("md5", hashKey)
        .update(date)
        .digest("hex");
    if (!req.files) {
        return "no image access";
    }
    else {
        const body = req.files.image.data;
        // encrypt base on base64
        let base64data = Buffer.from(body, "binary");
        const uploadParams = yield s3
            .upload({
            Bucket: bucket,
            Body: base64data,
            Key: filename + format,
            ACL: "public-read",
        })
            .promise();
        const answer = uploadParams.Location;
        return answer;
    }
});
exports.uploadService = uploadService;
