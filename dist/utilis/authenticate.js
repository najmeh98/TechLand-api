"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashpassmethod = exports.generateAcessToken = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const auth = (req, res, next) => {
    const token = req.header("authorization");
    const jwttoken = process.env.JWT_TOKEN;
    try {
        if (token) {
            const tokenUserId = jsonwebtoken_1.default.verify(token, jwttoken, {
                algorithms: ["HS256"],
            });
            //@ts-ignore
            req.adminId = tokenUserId; //type : string
            return next();
        }
        else {
            res.status(401).json("invalid token ");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.auth = auth;
// token
const generateAcessToken = (userId) => {
    const secretKey = process.env.JWT_TOKEN;
    return jsonwebtoken_1.default.sign(userId, secretKey, { algorithm: "HS256" });
};
exports.generateAcessToken = generateAcessToken;
// hash password
const hashpassmethod = (password) => {
    const passalogritm = process.env.PASS_ALGORITHM;
    const secret = process.env.PASS_SECRET;
    const pass = (0, crypto_1.createHmac)(passalogritm, secret)
        .update(password)
        .digest("hex");
    return pass;
};
exports.hashpassmethod = hashpassmethod;
