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
exports.adminprofile = void 0;
const checkdata_1 = require("../../../utilis/checkdata");
const main_services_1 = require("../../../utilis/main-services");
const prisma_1 = require("../../../utilis/prisma");
const adminprofile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const id = req.params.id;
        const dt = JSON.parse(req.body.admin);
        console.log("dt", dt);
        if (!id)
            return;
        // check data
        const value = (0, checkdata_1.dataValidation)(dt);
        if (value == false) {
            res.status(404).json("data is empty!");
        }
        // check token
        // ...
        const bucket = main_services_1.uploaderConfig.createProfile.bucket;
        const format = main_services_1.uploaderConfig.createProfile.format;
        const imgUrl = yield (0, main_services_1.uploadService)(req, bucket, format);
        const bucketbanner = main_services_1.uploaderConfig.createBanner.bucket;
        const formatbanner = main_services_1.uploaderConfig.createBanner.format;
        const bannerUrl = yield (0, main_services_1.uploadService)(req, bucketbanner, formatbanner);
        console.log("banner", bannerUrl);
        console.log("img", imgUrl);
        const updateInfo = yield prisma_1.prisma.admin.update({
            where: {
                id: id,
            },
            data: {
                id: undefined,
                name: dt.name,
                family: dt.family,
                email: dt.email,
                username: dt.username,
                address: dt.address,
                phoneNumber: dt.phoneNumber,
                image: ((_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.image) && `${imgUrl}`,
                banner: ((_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.banner) && `${bannerUrl}`,
                bio: dt.bio,
                job: dt.job,
                updatedAt: new Date().toISOString(),
            },
        });
        if (updateInfo) {
            console.log(updateInfo);
            res.status(200).json(updateInfo);
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
exports.adminprofile = adminprofile;
