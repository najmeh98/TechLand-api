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
exports.Authentication = exports.Login = void 0;
const prisma_1 = require("../../utilis/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const checkdata_1 = require("../../utilis/checkdata");
const authenticate_1 = require("../../utilis/authenticate");
//user login
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        //All fields must be filled'
        if (!email || !password) {
            return res.status(400).json("data problem");
        }
        const user = yield prisma_1.prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (user) {
            const userId = user.id;
            //build token
            const token = (0, authenticate_1.generateAcessToken)(userId);
            //compare pass
            const compare = yield bcrypt_1.default.compare(password, user.password);
            if (compare) {
                const update = yield prisma_1.prisma.user.update({
                    where: { id: userId },
                    data: {
                        updatedAt: new Date().toISOString(),
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
                        token: true,
                    },
                });
                if (update) {
                    res.status(200).json(update);
                }
            }
            else {
                res.status(404).json("password is invalid");
            }
        }
        else {
            res.status(401).json("There is no user with this profile");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.Login = Login;
// user register
const Authentication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.body.userInfo;
        const checkdata = (0, checkdata_1.dataValidation)(userInfo);
        const email = req.body.email;
        const password = userInfo.password;
        const username = userInfo.username;
        // const name: string = req.body.name;
        if (checkdata == false) {
            return res.status(402).json("error");
        }
        const User = yield prisma_1.prisma.user.findFirst({
            where: { email: email, username: username },
        });
        if (User) {
            return res.status(400).json({ error: "Email already exists" });
        }
        bcrypt_1.default.hash(password, 10, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            const newUser = yield prisma_1.prisma.user.create({
                data: {
                    id: undefined,
                    name: userInfo.name,
                    family: userInfo.family,
                    username: userInfo.username,
                    email: userInfo.email,
                    address: userInfo.address,
                    password: hash,
                    phoneNumber: userInfo.phone,
                    isAdmin: false,
                    bio: "",
                    skill: "",
                    token: "0",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                select: {
                    name: true,
                    family: true,
                    address: true,
                    email: true,
                    username: true,
                    phoneNumber: true,
                    id: true,
                    token: true,
                },
            });
            const token = (0, authenticate_1.generateAcessToken)(newUser.id);
            if (newUser) {
                return res.status(200).header("token", token).json(newUser);
            }
            else {
                res.status(401).json("Error creating user");
            }
        }));
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.Authentication = Authentication;
//****
// error Handling : 400 , 404, 500 , 200
//
//
