// import { Post } from "@prisma/client";

export type category = {
  name: string;
  description: string | null;
  id: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  posts: [];
};
