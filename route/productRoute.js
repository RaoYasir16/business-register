const router = require("express").Router()
const {addProducts, getProducts, getSingleProduct, updateProduct, deleteProduct} = require("../controllers/productController");

//Get all Products
router.get("/get-products/:id",getProducts);

//Get single Product
router.get("/getsingle-product/:id",getSingleProduct)

//Add Products
router.post("/add-products/:id",addProducts);

//Update Product
router.put("/update-product/:id",updateProduct);

// Delete Porduct
router.delete("/delete-product/:id",deleteProduct)

module.exports= router