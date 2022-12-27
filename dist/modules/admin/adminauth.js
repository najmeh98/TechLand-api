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
exports.adminLogin = exports.register = void 0;
const prisma_1 = require("../../utilis/prisma");
const authenticate_1 = require("../../utilis/authenticate");
// check data is not empty
const dataValidation = (adInfo) => {
    let flag = true;
    const keys = Object.keys(adInfo);
    for (let key of keys) {
        if (adInfo[key] === "" || adInfo[key] == 0) {
            if (flag !== flag) {
                flag = false;
            }
        }
        return flag;
    }
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adInfo = req.body.admin;
    const email = adInfo.email;
    const value = dataValidation(adInfo);
    if (value == false) {
        res.status(404).json("data is empty");
    }
    const admin = yield prisma_1.prisma.admin.findFirst({
        where: { email: email },
    });
    if (admin) {
        res.status(403).json({ error: "admin already exists." });
    }
    try {
        //hash password
        const pass = (0, authenticate_1.hashpassmethod)(adInfo.password);
        const result = yield prisma_1.prisma.admin.create({
            data: {
                id: undefined,
                name: adInfo.name,
                family: adInfo.family,
                email: adInfo.email,
                username: adInfo.username,
                password: pass,
                phoneNumber: adInfo.phoneNumber,
                address: adInfo.address,
                image: "",
                banner: "",
                token: "0",
                bio: "",
                job: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        console.log(result);
        const adminId = result.id;
        //token
        const token = (0, authenticate_1.generateAcessToken)(adminId);
        const admin = {
            id: result.id,
            name: result.name,
            family: result.family,
            username: result.username,
            email: result.email,
            address: result.address,
            phoneNumber: result.phoneNumber,
            image: result === null || result === void 0 ? void 0 : result.image,
            banner: result === null || result === void 0 ? void 0 : result.banner,
            createdAt: result === null || result === void 0 ? void 0 : result.createdAt,
            token: token,
        };
        if (result) {
            res.status(200).json(admin);
        }
        else {
            res.status(400).json("error creating admin");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.register = register;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            res.status(404).json("data problem");
        }
        const user = yield prisma_1.prisma.admin.findFirst({
            where: {
                email: email,
                // password: password,
            },
        });
        const userId = user === null || user === void 0 ? void 0 : user.id;
        const hashpassword = (0, authenticate_1.hashpassmethod)(password);
        const pass = user === null || user === void 0 ? void 0 : user.password;
        console.log(hashpassword);
        if (user) {
            const token = (0, authenticate_1.generateAcessToken)(userId);
            if (pass === hashpassword) {
                const update = yield prisma_1.prisma.admin.update({
                    where: { id: userId },
                    data: {
                        updatedAt: new Date(),
                        token: token,
                    },
                    select: {
                        id: true,
                        name: true,
                        family: true,
                        email: true,
                        username: true,
                        address: true,
                        phoneNumber: true,
                        image: true,
                        banner: true,
                        token: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                });
                if (update) {
                    res.status(200).json(update);
                }
                else {
                    res.status(400).json("bad request");
                }
            }
        }
        else {
            console.log(Error);
            res.status(401).json({ error: "Unauthorized" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.adminLogin = adminLogin;
