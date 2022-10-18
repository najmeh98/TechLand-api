import { Decimal } from "@prisma/client/runtime";
import { findpost, post } from "../posts/post.interface";

export interface admin {
  phoneNumber: Decimal;
  name: string;
  family: string;
  email: string;
  username: string;
  address: string;
  createdAt: Date;
}

export interface adminpost extends Omit<findpost, "id"> {}

export interface IAdInfo extends Omit<admin, ""> {
  job: string | null;
  bio: string | null;
  token: string;
  image: string | null;
  id: string;
  post: adminpost[];
}
