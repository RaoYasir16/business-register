const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

//Get all Products
const getProducts = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const existingCategory = await Category.findById(categoryId);

        if (!existingCategory) {
            return res.status(404).json({
                message: "Category does not exist"
            });
        }

        const allProducts = await Product.find({category_id: categoryId });

        if (!allProducts) {
            return res.status(404).json({
                message: "No products found"
            });
        }

        return res.status(200).json({
            message: "Products fetched successfully",
            allProducts
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

//Get single Product
const getSingleProduct = async(req,res)=>{
    try {
        const categoryId = req.body.category_id;
        const productId =req.params.id;

        if(!categoryId){
            return res.status(400).json({
                message:"Please Provide Category Id"
            });
        }
        const existingCategory = await Category.findById(categoryId);
        if(!existingCategory){
            return res.status(404).json({
                message:"Category not Exist"
            });
        }
        const existingProduct = await Product.findById(productId)
        if(!existingProduct){
            return res.status(404).json({
                message:"Product not found"
            });
        }

        if(existingProduct.category_id.toString() !== existingCategory._id.toString()){
            return res.status(403).json({
                message:"This category not own this Product"
            });
        }

        return res.status(200).json({
            message:"Product fatched Successfully",
            existingProduct
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message
        });
    }
}

//Add Porduct 
const addProducts = async(req , res)=>{
    try {
        const categoryId = req.params.id
    const existingCategory = await Category.findById(categoryId);
    if(!existingCategory){
        return res.status(404).json({
            message:"Category NOt Exist"
        });
    }
    const {name,description,price,quantity} = req.body

    if(!name || !description || !price|| !quantity){
        return res.status(403).json({
            message:"All field Require"
        });    
    }
    const newProduct = await Product.create({
        name,
        description,
        price,
        quantity,
        category_id:existingCategory.id
    });
    return res.status(200).json({
        message:"Product Created successfully",
        newProduct
    });
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

//Update the Product
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
    const categoryId = req.body.category_id;
  
    if (!categoryId) {
      return res.status(400).json({
        message: "Please provide Category Id"
      });
    }
  
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({
        message: "Category does not exist"
      });
    }
  
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        message: "Product does not exist"
      });
    }
  
    if (existingProduct.category_id.toString() !== existingCategory._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized: This category does not own the product"
      });
    }
  
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );
  
    return res.status(200).json({
      message: "Product updated successfully",
      updatedProduct
    });
    } catch (error) {
        return res.status(500).json({
            message:error.message
        });
    }
  };
  
  // Delete The Porduct
  const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const categoryId = req.body.category_id; 

        if (!categoryId) {
            return res.status(400).json({
                message: "Please Provide Category Id"
            });
        }

        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({
                message: "Product Not exist"
            });
        }

        const existingCategory = await Category.findById(categoryId); // ✅ Now passes a string ID
        if (!existingCategory) {
            return res.status(404).json({
                message: "Category Not exist"
            });
        }

        if (existingProduct.category_id.toString() !== existingCategory._id.toString()) {
            return res.status(403).json({
                message: "Unauthorized: Category does not own this Product"
            });
        }

        await Product.findByIdAndDelete(productId);
        return res.status(200).json({
            message: "Product Deleted Successfully",
            existingProduct
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {addProducts, getProducts, getSingleProduct,updateProduct, deleteProduct}