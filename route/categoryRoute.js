const { addCategory, getCategory, getSingleCategory, updateCategory } = require("../controllers/categoryController");
const router = require("express").Router();

//Add category
router.post("/add-category",addCategory);

//Get category for sapacifc business
router.get("/get-category/:id",getCategory);

//Get single category
router.get("/getsingle-category/:id",getSingleCategory);

//Update Category
router.put("/update-category/:id",updateCategory)



module.exports =router
