"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authenticate_1 = require("./utilis/authenticate");
const getAllPost_1 = require("./modules/admin/posts/getAllPost");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const deletePost_1 = require("./modules/admin/posts/deletePost");
const editPost_1 = require("./modules/admin/posts/editPost");
const adminauth_1 = require("./modules/admin/adminauth");
const adminprofile_1 = require("./modules/admin/admins/adminprofile");
const getAllInfo_1 = require("./modules/admin/admins/getAllInfo");
const adminCreate_1 = require("./modules/admin/admins/adminCreate");
const count_1 = require("./modules/admin/count/count");
const changePassword_1 = require("./modules/admin/admins/changePassword");
const postCreate_1 = require("./modules/admin/posts/postCreate");
const createCategory_1 = require("./modules/admin/category/createCategory");
const getCategories_1 = require("./modules/admin/category/getCategories");
const categoryInfo_1 = require("./modules/admin/category/categoryInfo");
const deleteCategory_1 = require("./modules/admin/category/deleteCategory");
const editCategory_1 = require("./modules/admin/category/editCategory");
const singlePost_1 = require("./modules/admin/posts/singlePost");
const getPosts_1 = require("./modules/user/getPosts");
const getAllCategories_1 = require("./modules/getAllCategories");
const getPostInfo_1 = require("./modules/user/getPostInfo");
const getAdminInfo_1 = require("./modules/user/getAdminInfo");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ********* Routes ***********
const port = 3001;
app.use((0, express_fileupload_1.default)()); // Don't forget this line!
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
app.post("/api/data/getposts", getPosts_1.getPosts);
//get Category
app.get("/api/data/getAllCategories", getAllCategories_1.getAllCategories);
//get post Info
app.get("/api/data/post", getPostInfo_1.getPostInfo);
// writer info
app.get("/api/data/Info", getAdminInfo_1.getAdminInfo);
//admin
// count of users
// app.post("/api/data/admin/getAllusers", auth, GetAllusers); // ?
//delete user
// app.delete("/api/data/admin/deleteUser/:id", auth, DeleteUser); // ?
// edit user info
// app.post("/api/data/admin/editUserInfo/:id", auth, EditUserInfo); //?
app.post("/api/admin/auth", adminauth_1.register);
//Login
app.post("/api/admin/login", adminauth_1.adminLogin);
//post create
app.post("/api/data/admin/postCreate", authenticate_1.auth, postCreate_1.postCreate);
//profile of admin
app.post("/api/admin/profile/:id", authenticate_1.auth, adminprofile_1.adminprofile);
//get all info
app.post("/api/data/allInfo", authenticate_1.auth, getAllInfo_1.GetallInfo);
//create admin
app.post("/api/data/admin/adminCreate", authenticate_1.auth, adminCreate_1.adminCreate);
//count of posts & users
app.post("/api/data/count", authenticate_1.auth, count_1.count);
//change password
app.post("/api/admin/changePassword", authenticate_1.auth, changePassword_1.changePassword);
// create category
app.post("/api/data/admin/setCategory", authenticate_1.auth, createCategory_1.createCategory);
// get all categories
app.get("/api/data/admin/getCategories", authenticate_1.auth, getCategories_1.getCategories);
//get single category
app.get("/api/data/admin/getCategory_Info", authenticate_1.auth, categoryInfo_1.categoryInfo);
//delete category
app.post("/api/data/admin/deleteCategory", authenticate_1.auth, deleteCategory_1.deleteCategory);
//edit category
app.post("/api/data/admin/editCategory", authenticate_1.auth, editCategory_1.editCategory);
// get single post
app.get("/api/data/getpost_Info", authenticate_1.auth, singlePost_1.singlePost);
//delete post
app.delete("/api/data/deletePost", authenticate_1.auth, deletePost_1.DeletePost);
//Edit Post
app.post("/api/data/editPost", authenticate_1.auth, editPost_1.EditPost);
//get Posts
app.get("/api/data/getAllposts", authenticate_1.auth, getAllPost_1.GetAllPost);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
// Admin
// **
//Register , login , create post , edit post , delete post , create admin , getadminInfo , post count , change password ,
//
