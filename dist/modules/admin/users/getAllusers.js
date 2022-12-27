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
exports.GetAllusers = void 0;
const prisma_1 = require("../../../utilis/prisma");
const GetAllusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                family: true,
                username: true,
                email: true,
                phoneNumber: true,
                address: true,
                createdAt: true,
            },
        });
        if (result) {
            res.status(200).json(result);
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
exports.GetAllusers = GetAllusers;
//Todo
/****
 * 1. get all users
 *
 *
 *
 *
 *
 */
