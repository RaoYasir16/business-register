const Category = require("../models/categoryModel");
const Business = require("../models/businessModel");
const mongoose = require("mongoose")

//Add category
const addCategory = async(req ,res)=>{
    try {
        const {business_id, name} = req.body;
        if(!business_id || !name){
            return res.status(400).json({
                message:"All field are require"
            });
        }
        const existingBusiness = await Business.findById(business_id)
        if(!existingBusiness){
            return res.status(404).json({
                message:"Business not exist"
            });
        }

        const category = await Category.create({
            business_id,
            name
        });
        return res.status(200).json({
            message:"category created successfully",
            category
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

//Get categorys relted to Spasific business
const getCategory = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id)
  
      if (!id) {
        return res.status(400).json({
          message: "Id is required"
        });
      }
  
      const existingBusiness = await Business.findById(id);
      console.log(existingBusiness)
  
      if (!existingBusiness) {
        return res.status(400).json({
          message: "Business does not exist"
        });
      }
  
      const allCategory = await Category.find({business_id:id})
      return res.status(200).json({
        allCategory
      })
  
    } catch (error) {
      return res.status(500).json({
        error: error.message
      });
    }
  };

  //Get single category 
  const getSingleCategory = async (req, res) => {
    try {
      const businessId = req.body.business_id;
      const categoryId = req.params.id;
  
      if (!businessId) {
        return res.status(400).json({
          message: "Business ID is required"
        });
      }
  
      const existingBusiness = await Business.findById(businessId);
      if (!existingBusiness) {
        return res.status(404).json({
          message: "Business does not exist"
        });
      }
  
      const existingCategory = await Category.findById(categoryId);
      if (!existingCategory) {
        return res.status(404).json({
          message: "Category does not exist"
        });
      }
  
      if (existingCategory.business_id.toString() !== existingBusiness._id.toString()) {
        return res.status(403).json({
          message: "Unauthorized: You do not own this Category"
        });
      }
  
      return res.status(200).json({
        message: "Single Category fetched successfully",
        existingCategory
      });
  
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };
  
//Update Category
const updateCategory = async (req, res) => {
    try {
      const businessId = req.body.business_id;
      const categoryId = req.params.id;
  
      if (!businessId) {
        return res.status(400).json({
          message: "Business ID is required"
        });
      }
  
      const existingBusiness = await Business.findById(businessId);
      if (!existingBusiness) {
        return res.status(404).json({
          message: "Business does not exist"
        });
      }
  
      const existingCategory = await Category.findById(categoryId);
      if (!existingCategory) {
        return res.status(404).json({
          message: "Category does not exist"
        });
      }
  
      if (existingCategory.business_id.toString() !== existingBusiness._id.toString()) {
        return res.status(403).json({
          message: "Unauthorized: You do not own this category"
        });
      }
  
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        
           req.body,
        
        { new: true }
      );
  
      return res.status(200).json({
        message: "Category updated successfully",
        updatedCategory
      });
  
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  };
  


module.exports = {addCategory,getCategory,getSingleCategory, updateCategory}