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
exports.adminCreate = void 0;
const checkdata_1 = require("../../../utilis/checkdata");
const hashpass_1 = require("../../../utilis/hashpass");
const prisma_1 = require("../../../utilis/prisma");
const adminCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const dt = (_a = req.body) === null || _a === void 0 ? void 0 : _a.adminInfo;
    try {
        const value = (0, checkdata_1.dataValidation)(dt);
        if (value == false) {
            res.status(404).json("data problem");
        }
        const phoneNumber = dt === null || dt === void 0 ? void 0 : dt.phoneNumber;
        const findAdmin = yield prisma_1.prisma.admin.findFirst({
            where: {
                phoneNumber: phoneNumber,
            },
        });
        if (findAdmin) {
            res.status(403).json({ error: "admin already exists." });
        }
        // password hash
        const pass = (0, hashpass_1.passwordHash)(dt.password);
        // create new admin
        const admin = yield prisma_1.prisma.admin.create({
            data: {
                id: undefined,
                name: dt.name,
                family: dt.family,
                email: dt.email,
                username: dt.username,
                address: dt.address,
                phoneNumber: dt.phoneNumber,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                token: "0",
                password: pass,
                bio: "",
                job: "",
            },
            select: {
                name: true,
                family: true,
                username: true,
                email: true,
                address: true,
                phoneNumber: true,
                createdAt: true,
            },
        });
        if (admin) {
            res.status(200).json(admin);
        }
        else {
            res.status(400).json("Error in creating a new admin");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.adminCreate = adminCreate;
