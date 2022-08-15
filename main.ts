import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Authentication, Login } from "./modules/user/auth";
// import fileUpload from "express-fileupload";
import multer from "multer";
import { auth, generateAcessToken } from "./utilis/authenticate";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { GetAllPost } from "./modules/user/post/getAllPost";
import fileUpload from "express-fileupload";
import { DeletePost } from "./modules/user/post/deletePost";
import { prisma } from "./utilis/prisma";
import { EditPost } from "./modules/user/post/editPost";
import crypto from "crypto";
import { userInfo } from "./modules/user/users/userInfo";
import { getPost } from "./modules/user/post/getPost";
import { userValid } from "./modules/user/users/userValid";
import { adminLogin, register } from "./modules/admin/adminauth";
import { GetAllusers } from "./modules/admin/users/getAllusers";
import { DeleteUser } from "./modules/admin/users/deleteUser";
import { EditUserInfo } from "./modules/admin/users/editUserInfo";
import { adminprofile } from "./modules/admin/admins/adminprofile";
import { PostCreate } from "./modules/user/post/postcreate";
import { GetallInfo } from "./modules/admin/admins/getAllInfo";
import { adminCreate } from "./modules/admin/admins/adminCreate";
import { postsCount } from "./modules/admin/count/postsCount";
import { usersCount } from "./modules/admin/users/usersCount";
import { changePassword } from "./modules/admin/admins/changePassword";
import { userPassword } from "./modules/user/users/userPassword";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ********* Routes ***********

const port = 3001;

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
app.post("/api/data/add-post", auth, PostCreate);
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
// change password
app.post("/api/data/user/cahngePassword", auth, userPassword);

//admin
app.post("/api/admin/auth", register);
//Login
app.post("/api/admin/login", adminLogin);
// count of users
app.get("/api/data/admin/getAllusers", auth, GetAllusers);
//delete user
app.delete("/api/data/admin/deleteUser/:id", auth, DeleteUser);
// edit user info
app.post("/api/data/admin/editUserInfo/:id", auth, EditUserInfo);
//profile of admin
app.post("/api/admin/profile/:id", auth, adminprofile);
//get all info
app.post("/api/data/allInfo", auth, GetallInfo);
//create admin
app.post("/api/data/admin/adminCreate", auth, adminCreate);
//count of posts & users
app.post("/api/data/count", auth, postsCount);
//change password
app.post("/api/admin/changePassword", auth, changePassword);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
