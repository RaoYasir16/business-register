const Customer = require("../models/customerModel");
const Business = require("../models/businessModel");


// Get Customer
const getCustomers = async (req, res) => {
    try {
      const id = req.params.id;
  
      const existingBusiness = await Business.findById(id);
      if (!existingBusiness) {
        return res.status(404).json({
          message: "Business does not exist",
        });
      }
  
      const customers = await Customer.find({ business_id: id });
  
      if (!customers) {
        return res.status(404).json({
          message: "No customers found for this business",
        });
      }
  
      return res.status(200).json({
        message: "Customers fetched successfully",
        customers,
      });
  
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }; 
  
//Get single Customer
  const getSingleCustomer = async(req,res)=>{
    try {
        const businessId = req.body.business_id;
        const customerId = req.params.id;
        if(!businessId){
            return res.status({
                message:"Please Provide Business ID"
            });
        }

        const existingBusiness = await Business.findById(businessId);
        if(!existingBusiness){
            return res.status(404)({
                message:"Business not Exist"
            });
        }
        const existingCustomer = await Customer.findById(customerId);
        if(!customerId){
            return res.status(404).json({
                message:"Customer Not Exist"
            });
        }

        if(existingCustomer.business_id.toString() !== existingBusiness._id.toString()){
            return res.status(404).json({
                message:" No Customer found related to this business"
            });
        }
        return res.status(200).json({
            message:"Customer get Successfully",
            existingCustomer
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
    }
  }
//Add Customer
const addCustomer = async(req ,res)=>{
    try {
        const {business_id,name,email,address} = req.body;
        if(!business_id || !name || !email|| !address){
            return res.status(403).json({
                message:"All field are Require"
            });
        }
        const existingBusiness = await Business.findById(business_id);
        if(!existingBusiness){
            return res.status(404).json({
                message:"Business not exist"
            });
        }
        const customer = await Customer.create({
            business_id,
            name,
            email,
            address
        });
        return res.status(200).json({
            message:"Customer Created Successfully",
            customer
        });
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
    }
}

//Update Customer data
const updateCustomer = async (req, res) => {
    try {
      const businessId = req.body.business_id;
      const customerId = req.params.id;
  
      if (!businessId) {
        return res.status(400).json({
          message: "Please provide business ID",
        });
      }
  
      const existingBusiness = await Business.findById(businessId);
      if (!existingBusiness) {
        return res.status(404).json({
          message: "Business does not exist",
        });
      }
  
      const existingCustomer = await Customer.findById(customerId);
      if (!existingCustomer) {
        return res.status(404).json({
          message: "Customer does not exist",
        });
      }
  
      if (existingCustomer.business_id.toString() !== existingBusiness._id.toString()) {
        return res.status(403).json({
          message: "Unauthorized: You do not own this customer",
        });
      }
  
      const updatedCustomer = await Customer.findByIdAndUpdate(
        customerId,
        req.body,
        { new: true }
      );
  
      return res.status(200).json({
        message: "Customer updated successfully",
        updatedCustomer,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  //Delete Customer 
  const deleteCustomer = async(req,res)=>{
    const businessId = req.body.business_id;
    const customerId = req.params.id;

    if(!businessId){
        return res.status(400).json({
            message:"Please Provide Business ID"
        });
    }
    
    const existingBusiness = await Business.findById(businessId);
    if(!existingBusiness){
        return res.status(404).json({
            message:"Business not Exist"
        });
    }
     
    const existingCustomer = await Customer.findById(customerId);
    if(!existingCustomer){
        return res.status(404).json({
            message:"Customer Not Exist"
        });
    }
    
    if(existingCustomer.business_id.toString() !== existingBusiness._id.toString()){
        return res.status(403).json({
            message:"Unauthorized: You do not own this customer"
        });
    }
    await Customer.findByIdAndDelete(existingCustomer)
    return res.status(200).json({
      message:"Customer Delete Successfully",
      existingCustomer
    });
  }
  

module.exports = {addCustomer,getCustomers,getSingleCustomer,updateCustomer,deleteCustomer}