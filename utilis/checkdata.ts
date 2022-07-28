// check data is not empty
export const dataValidation = (adInfo: any): boolean | undefined => {
  let flag: boolean = true;
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
