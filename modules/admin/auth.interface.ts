import { Decimal } from "@prisma/client/runtime";

export type update = {
  phoneNumber: Decimal;
  id: string;
  name: string;
  family: string;
  email: string;
  username: string;
  address: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  token: string;
};
