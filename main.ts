import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { auth } from "./utilis/authenticate";
import { GetAllPost } from "./modules/admin/posts/getAllPost";
import fileUpload from "express-fileupload";
import { DeletePost } from "./modules/admin/posts/deletePost";
import { EditPost } from "./modules/admin/posts/editPost";
import { adminLogin, register } from "./modules/admin/adminauth";
import { adminprofile } from "./modules/admin/admins/adminprofile";
import { GetallInfo } from "./modules/admin/admins/getAllInfo";
import { adminCreate } from "./modules/admin/admins/adminCreate";
import { postsCount } from "./modules/admin/count/postsCount";
import { changePassword } from "./modules/admin/admins/changePassword";
import { postCreate } from "./modules/admin/posts/postCreate";
import { createCategory } from "./modules/admin/category/createCategory";
import { getCategories } from "./modules/admin/category/getCategories";
import { categoryInfo } from "./modules/admin/category/categoryInfo";
import { deleteCategory } from "./modules/admin/category/deleteCategory";
import { editCategory } from "./modules/admin/category/editCategory";
import { singlePost } from "./modules/admin/posts/singlePost";
import { getPosts } from "./modules/user/getPosts";
import { getAllCategories } from "./modules/getAllCategories";
import { getPostInfo } from "./modules/user/getPostInfo";
import { getAdminInfo } from "./modules/user/getAdminInfo";

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

// Login
// app.post("/api/user/login", Login);
// Authorization
// app.post("/api/user/auth", Authentication);
//get user
// app.post("/api/data/getUser/:id/:slug", auth, userProfile);
// user valid
// app.post("/api/data/userValid", auth, userValid);
// change password
// app.post("/api/data/user/cahngePassword", auth, userPassword);

// get posts
app.post("/api/data/getposts", getPosts);
//get Category
app.get("/api/data/getAllCategories", getAllCategories);
//get post Info
app.get("/api/data/post", getPostInfo);
// writer info

app.get("/api/data/Info", getAdminInfo);

//admin
// count of users
// app.post("/api/data/admin/getAllusers", auth, GetAllusers); // ?
//delete user
// app.delete("/api/data/admin/deleteUser/:id", auth, DeleteUser); // ?
// edit user info
// app.post("/api/data/admin/editUserInfo/:id", auth, EditUserInfo); //?

app.post("/api/admin/auth", register);
//Login
app.post("/api/admin/login", adminLogin);
//post create
app.post("/api/data/admin/postCreate", auth, postCreate);
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
// create category
app.post("/api/data/admin/setCategory", auth, createCategory);
// get all categories
app.get("/api/data/admin/getCategories", auth, getCategories);
//get single category
app.get("/api/data/admin/getCategory_Info", auth, categoryInfo);
//delete category
app.post("/api/data/admin/deleteCategory", auth, deleteCategory);
//edit category
app.post("/api/data/admin/editCategory", auth, editCategory);
// get single post
app.get("/api/data/getpost_Info", auth, singlePost);
//delete post
app.delete("/api/data/deletePost", auth, DeletePost);
//Edit Post
app.post("/api/data/editPost", auth, EditPost);
//get Posts
app.get("/api/data/getAllposts", auth, GetAllPost);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Admin
// **
//Register , login , create post , edit post , delete post , create admin , getadminInfo , post count , change password ,

//
