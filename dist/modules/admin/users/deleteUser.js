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
exports.DeleteUser = void 0;
const prisma_1 = require("../../../utilis/prisma");
const DeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id)
            return;
        const deleteuser = yield prisma_1.prisma.user.delete({
            where: { id: id },
        });
        if (deleteuser) {
            res.status(200).json({ deleteuser, message: "user deleted successfuly" });
        }
        else {
            res.status(400).json("user does not delete");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.DeleteUser = DeleteUser;
