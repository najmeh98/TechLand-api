import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Authentication, Login } from "./modules/auth";
// import fileUpload from "express-fileupload";
import multer from "multer";
import { auth } from "./utilis/authenticate";
import { createPost, upload } from "./modules/CreatePost";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// app.use(fileUpload());

// ********* Routes ***********

const port = 7000;

app.get("/", (req, res) => {
  console.log("already Done!");
  res.json("Hello World!");
});

app.post("/api/data/add", (req, res) => {
  console.log("req.file:", req.file);
  console.log("req.body", req.body);
  let body = req.file;
  res.status(200).json({ body });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Login
app.post("/api/user/login", Login);

// Authorization
app.post("/api/user/auth", Authentication);

// Create Post
app.post("/api/data/add-post", createPost);

//get Post
app.get("/api/data/getAllpost/:id");

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
