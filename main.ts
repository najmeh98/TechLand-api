import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Authentication, Login } from "./modules/auth";
import { CreatePost, upload } from "./modules/CreatePost";
// import fileUpload from "express-fileupload";
import multer from "multer";
import { auth } from "./utilis/authenticate";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// app.use(fileUpload());

// ********* Routes ***********

const port = 7000;

app.get("/", (req, res) => {
  console.log("already Done!");
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Login
app.post("/api/user/login", Login);

// Authorization
app.post("/api/user/auth", Authentication);

// Create Post
app.post("/api/data/add-post", upload, CreatePost);

//get Post
app.get("/api/data/get-post");
