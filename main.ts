import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Authentication, Login } from "./modules/auth";
// import fileUpload from "express-fileupload";
import multer from "multer";
import { auth } from "./utilis/authenticate";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Posts } from "./modules/post";
import { GetAllPost } from "./modules/getAllPost";
import fileUpload from "express-fileupload";
import { DeletePost } from "./modules/deletePost";
import { prisma } from "./utilis/prisma";
import { EditPost } from "./modules/editPost";
import { CreatePost } from "./modules/createPost";
import crypto from "crypto";
import { userInfo } from "./modules/userInfo";
import { getPost } from "./modules/getPost";
import { userValid } from "./modules/userValid";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// app.use(fileUpload());

// ********* Routes ***********

const port = 7000;

app.use(fileUpload()); // Don't forget this line!

app.post("/upload", function (req, res) {
  if (req.files === undefined) {
    return;
  }
  console.log(req.files);
  res.send("UPLOADED!!!");
});

app.get("/", (req, res) => {
  console.log("already Done!");
  res.json("Hello World!");
});

app.delete("/api/data/deletePost/:id", auth, DeletePost);

// Login
app.post("/api/user/login", Login);

// Authorization
app.post("/api/user/auth", Authentication);

// Create Post
app.post("/api/data/add-post", auth, CreatePost);

//Edit Post
app.post("/api/data/editPost/:id", EditPost);
//get Post
app.post("/api/data/getAllpost/:id", auth, GetAllPost);

//get user
app.post("/api/data/getUser/:id/:slug", auth, userInfo);

//get post
app.get("/api/data/getPost/:id", getPost);

// user valid
app.post("/api/data/userValid", auth, userValid);

//get list of posts
app.post("/api/data/post", Posts);

app.get("/", (req, res) => {
  const secret = "GfG";
  const hash: any = crypto
    .createHmac("sha256", secret)
    .update("GeeksforGeeks")
    .digest("hex");
  if (hash) {
    console.log(hash);
  } else {
    console.log("does not excited");
  }

  console.log("already Done!");
  res.json({ hash });
});

// const spacesEndpoint = new AWS.Endpoint(
//   "https://s3.ir-thr-at1.arvanstorage.com"
// );
// const accesskeyid: any = process.env.UPLOADER_ACCESS_KEYID;
// const secretkey: any = process.env.UPLOADER_SECRET_ACCESSKEY;
// const s3 = new AWS.S3({
//   endpoint: spacesEndpoint,
//   accessKeyId: accesskeyid,
//   secretAccessKey: secretkey,
// });

// export const uploadService = async (
//   req: any,
//   bucket: any,
//   format: any
// ): Promise<string> => {
//   const date: any = Date();
//   const hashkey: any = process.env.UPLEADER_HASH_KEY;
//   const hashalg: any = process.env.HASH_ALGORITHM;
//   const filename: any = createHmac(hashalg, hashkey).update(date).digest("hex");
//   if (!req.files) {
//     const answer: string = "noimg";
//     return answer;
//   } else {
//     const boody: string = req.files.file.data;
//     let base64data = Buffer.from(boody, "binary");
//     const uploadParams = await s3
//       .upload({
//         Bucket: bucket,
//         Body: base64data,
//         Key: filename + format,
//         ACL: "private",
//       })
//       .promise();
//     const answer: string = uploadParams.Location;
//     return answer;
//   }
// };

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
