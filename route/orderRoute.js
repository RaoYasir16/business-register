const { addOrders, getOrders, getSingleOrder, deleteOrder } = require("../controllers/ordersController");
const router = require("express").Router();

//Get all Order
router.get("/get-orders/:id",getOrders);

//Get single Order
router.get("/getsingle-order/:id",getSingleOrder);

// Add order route
router.post("/add-orders/:id", addOrders);

// Delete Order
router.delete("/delete-order/:id",deleteOrder)

module.exports = router;