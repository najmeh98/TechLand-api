import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Authentication, Login } from "./modules/user/auth";
// import fileUpload from "express-fileupload";
import multer from "multer";
import { auth } from "./utilis/authenticate";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { GetAllPost } from "./modules/user/post/getAllPost";
import fileUpload from "express-fileupload";
import { DeletePost } from "./modules/user/post/deletePost";
import { prisma } from "./utilis/prisma";
import { EditPost } from "./modules/user/post/editPost";
import { CreatePost } from "./modules/user/post/createPost";
import crypto from "crypto";
import { userInfo } from "./modules/user/users/userInfo";
import { getPost } from "./modules/user/post/getPost";
import { userValid } from "./modules/user/users/userValid";
import { adminLogin, register } from "./modules/admin/adminauth";
import { GetAllusers } from "./modules/admin/users/getAllusers";
import { DeleteUser } from "./modules/admin/users/deleteUser";

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

// user
app.delete("/api/data/deletePost/:id", auth, DeletePost);
// Login
app.post("/api/user/login", Login);
// Authorization
app.post("/api/user/auth", Authentication);
// Create Post
app.post("/api/data/add-post", auth, CreatePost);
//Edit Post
app.post("/api/data/editPost/:id", auth, EditPost);
//get Post
app.post("/api/data/getAllpost/:id", auth, GetAllPost);
//get user
app.post("/api/data/getUser/:id/:slug", auth, userInfo);
//get post
app.get("/api/data/getPost/:id", auth, getPost);
// user valid
app.post("/api/data/userValid", auth, userValid);

//admin
app.post("/api/admin/auth", register);
//Login
app.post("/api/admin/login", adminLogin);
// count of users
app.get("/api/data/admin/getAllusers", GetAllusers);
//delete user
app.post("/api/data/admin/deleteUser/:id", DeleteUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
