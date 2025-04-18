const {addCustomer, getCustomers, getSingleCustomer, updateCustomer, deleteCustomer} = require("../controllers/customerController");
const router = require("express").Router();


//Get all Customer
router.get("/get-customers/:id",getCustomers);

//Get Single Customer
router.get("/getSingle-customer/:id",getSingleCustomer);

//Add Customer
router.post("/add-customer",addCustomer);

//Update Customer
router.put("/update-customer/:id",updateCustomer);

//Delete Customer
router.delete("/delete-customer/:id",deleteCustomer)
module.exports = router