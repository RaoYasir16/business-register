const router = require("express").Router();
const { addBusiness, getUserBusiness,getBusinessByID, updateBusiness, deleteBusiness } = require("../controllers/businessController");
const validateUser = require("../middleware/auth")

//Get All Business
//apply Midleware on this route
router.get("/get-business",validateUser,getUserBusiness);

//Get Business by its ID
//apply middleware
router.get("/get-business/:id",validateUser,getBusinessByID);

//Add business
//apply midleware on this route
router.post("/add-business",validateUser,addBusiness);

//Update business
//apply midleware on this route
router.put("/update-business/:id",validateUser,updateBusiness);

//Delete Business
//applymidleware on this route
router.delete("/delete-business/:id",validateUser,deleteBusiness);

module.exports =router