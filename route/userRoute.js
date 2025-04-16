const router = require("express").Router();
const { addUser, loginUser } = require("../controllers/userController");

//add users
router.post("/add-user",addUser)
//Login Users
router.post("/login-user",loginUser)

module.exports = router;