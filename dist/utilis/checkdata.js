"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataValidation = void 0;
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
exports.dataValidation = dataValidation;
