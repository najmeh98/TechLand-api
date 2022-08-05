import { createHmac } from "crypto";

export const hasspassword = (password: string): string => {
  const passalogritm: any = process.env.PASS_ALGORITHM;
  const secret: any = process.env.PASS_SECRET;
  const jwtToken: any = process.env.JWT_TOKEN;

  const pass: string = createHmac(passalogritm, secret)
    .update(password)
    .digest("hex");

  return pass;
};
