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
exports.imageServices = void 0;
const main_services_1 = require("../../../utilis/main-services");
const imageServices = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const bucket = main_services_1.uploaderConfig.createCategory.bucket;
    const format = main_services_1.uploaderConfig.createCategory.format;
    const imgUrl = yield (0, main_services_1.uploadService)(req, bucket, format);
    return imgUrl;
});
exports.imageServices = imageServices;
