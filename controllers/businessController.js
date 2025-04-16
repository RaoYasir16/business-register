const Business = require("../models/businessModel");
const User = require("../models/userModel"); // Import your user model

//Get businesses related to User
const getUserBusiness = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.user.email });

    if (!existingUser) {
      return res.status(401).json({
        message: "User does not exist"
      });
    }

    const businesses = await Business.find({ user_id: existingUser._id });

    return res.status(200).json({
      message: "Businesses fetched successfully",
      businesses
    });
    
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

//Get business by ID
const getBusinessByID = async (req, res) => {
  try {
    const id = req.params.id;

    const existingUser = await User.findOne({ email: req.user.email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist"
      });
    }

    const existingBusiness = await Business.findById(id);
    if (!existingBusiness) {
      return res.status(404).json({
        message: "Business not found"
      });
    }

    if (existingBusiness.user_id.toString() !== existingUser._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized: You do not own this business"
      });
    }

    return res.status(200).json({
      message: "Business fetched successfully",
      data: existingBusiness
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

//Add Business

const addBusiness = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.user.email });

    if (!existingUser) {
      return res.status(401).json({
        message: "User does not exist"
      });
    }

    const { name, address, contact_number } = req.body;

    if (!name || !address || !contact_number) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const business = await Business.create({
      name,
      address,
      contact_number,
      user_id: existingUser._id
    });

    return res.status(200).json({
      message: "Business added successfully",
      business
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};


//Update business

const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check if user exists from decoded token
    const existingUser = await User.findOne({ email: req.user.email });
    if (!existingUser) {
      return res.status(401).json({
        message: "User does not exist"
      });
    }

    // ✅ Find business by its ID
    const existingBusiness = await Business.findById(id);
    if (!existingBusiness) {
      return res.status(404).json({
        message: "Business not found"
      });
    }

    // ✅ Check if user owns the business
    if (existingBusiness.user_id.toString() !== existingUser._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized: You can't update this business"
      });
    }

    // ✅ Update business
    const updatedBusiness = await Business.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      message: "Business updated successfully",
      business: updatedBusiness
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

//Delete business
const deleteBusiness = async(req,res)=>{
  try {
    const id = req.params.id;
  const existingUser = await User.findOne({email: req.user.email})
  if(!existingUser){
    return res.status(401).json({
      message:"User does not exist"
    });
  }
  const existingBusiness = await Business.findById(id);
  if(!existingBusiness){
    return res.status(404).json({
      message:"Business not found"
    });
  }
  if(existingBusiness.user_id.toString() !== existingUser._id.toString()){
    return res.status(403).json({
      message:"Unauthorized: You can't delete this business"
    });
  }
   await Business.findByIdAndDelete({_id: req.params.id});
  return res.status(200).json({
    message:"Business delete successfully",
    existingBusiness
  })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
    
  }
}

module.exports = {addBusiness,getUserBusiness,getBusinessByID, updateBusiness, deleteBusiness}