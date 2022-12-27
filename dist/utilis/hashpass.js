"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordHash = void 0;
const crypto_1 = require("crypto");
const passwordHash = (password) => {
    const passalogritm = process.env.PASS_ALGORITHM;
    const secret = process.env.PASS_SECRET;
    const jwtToken = process.env.JWT_TOKEN;
    const pass = (0, crypto_1.createHmac)(passalogritm, secret)
        .update(password)
        .digest("hex");
    return pass;
};
exports.passwordHash = passwordHash;
