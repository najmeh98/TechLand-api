import { Request, Response } from "express";
// import fileUpload from "express-fileupload";
import express from "express";
import { prisma } from "../../../utilis/prisma";
import multer from "multer";
import fs, { mkdir } from "fs";
import { uploaderConfig, uploadService } from "../../../utilis/main-services";

const app = express();
// app.use(express.static("upload"));
const getDirImage = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();

  return `./upload/images/${year}/${month}/${day}`;
};

const fileStorage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    const dir = getDirImage();

    fs.mkdirSync(dir, { recursive: true });

    return cb(null, dir);
  },
  filename: (req: any, file: any, cb: any) => {
    // save in database
    const filepath: any = `${getDirImage()}/${file.originalname}`;

    // if (!fs.existsSync(filepath)) {
    cb(null, file.originalname);

    req.body.filepath = filepath;
    // } else {
    // cb(null, `${Date.now()} - ${file.originalname}`);
    // }
  },
});

export const upload: any = multer({
  storage: fileStorage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).single("file");

export const CreatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const bucket: string = uploaderConfig.createImage.bucket;
  const format: string = uploaderConfig.createImage.format;

  // if (bucket) {
  //   console.log(bucket);
  // }

  const title: string = req.body.title;
  const content: string = req.body.content;
  const files: any = req.files;

  console.log(files);
  console.log(title, content);

  const imgUrl: string = await uploadService(req, bucket, format);
  if (imgUrl) {
    console.log(imgUrl);
  }
  try {
    const newPost: any = await prisma.post.create({
      data: {
        title: title,
        content: content,
        image: `${imgUrl}`,
        // image: "",
        author: {
          //@ts-ignore
          connect: { id: req.userId },
        },
        category: {
          create: { name: "" },
        },
      },
    });
    console.log(newPost);
    if (newPost) {
      res.status(200).json(newPost);
    } else {
      res.status(400).json("error");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
// const newpost = await prisma.post.create({
//   data: {
//     title: "Post 3",
//     content: "alsp boop!",
//     image: filepath,
//     author: {
//       connectOrCreate: {
//         create: {
//           email: "someone@example.com",
//           password: "someone",
//         },
//         where: {
//           email: "someone@example.com",
//         },
//       },
//     },
//   },
// });
// console.dir({ newpost }, { depth: Infinity });
// console.log(newpost);
// const post = await prisma.post.findMany({});

// console.log(post);
// createdPost.push({ ...newpost });
