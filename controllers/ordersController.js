const Order = require ("../models/ordersModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Customer =require("../models/customerModel")

//Get Order related to Users
const getOrders = async (req,res)=>{
    const userId = req.params.id
    const existingUser = await User.findById(userId);
    if(!existingUser){
        return res.status(404).json({
            message:"User not Exist"
        });
    }

    const allOrders = await Order.find({user_id:userId});
    if(!allOrders){
        return res.status(404).json({
            message:"No Order found related to this User"
        });
    }
    return res.status(200).json({
        message:"All order fatched successfully",
        allOrders
    })
}

//Get single Order
const getSingleOrder = async (req,res)=>{
   try {
    const orderId = req.params.id
    const userId = req.body.user_id

    if(!userId){
        return res.status(403).json({
            message:"Please Enter User ID"
        });
    }
    const existingUser = await User.findById(userId);
    if(!existingUser){
        return res.status(404).json({
            message:"User not Exist"
        });
    }
    const existingOrder = await Order.findById(orderId);
    if(!existingOrder){
        return res.status(404).json({
            message:"Order not exist"
        });
    }

    if(existingOrder.user_id.toString() !== existingUser.id.toString()){
        return res.status(400).json({
            message:"Unutherized: User not own this order"
        });
    }

    return res.status(200).json({
        message:"Order fatched Successfully",
        existingOrder
    });
   } catch (error) {
    return res.status(500).json({
        message:error.message
    })
   }
}

//Add order
const addOrders = async(req ,res)=>{
    try {
        const user_id = req.params.id; 
        const product_id = req.body.product_id;
        const customer_id = req.body.customer_id;
        
        if(!product_id || !customer_id){
            return res.status(403).json({
                message:"All field require"
            })
        }
        const existingUser = await User.findById(user_id);
        if(!existingUser){
            return res.status(404).json({
                message:"User Not Exist"
            });
        }
        const existingProduct = await Product.findById(product_id);
        if(!existingProduct){
            return res.status(404).json({
                message:"Prodcut not exist"
            });
        }
        const existingCustomer = await Customer.findById(customer_id);
        if(!existingCustomer){
            return res.status(404).json({
                message:"Customer Not exist"
            });
        }
        const orderAdd = await Order.create({
            customer_id,
            product_id,
            user_id:req.params.id
        });
        return res.status(200).json({
            message:"Order added successfully",
            orderAdd
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        });
    }
}

//Delete Order
const deleteOrder = async (req,res)=>{
    try {
     const orderId = req.params.id
     const userId = req.body.user_id
 
     if(!userId){
         return res.status(403).json({
             message:"Please Enter User ID"
         });
     }
     const existingUser = await User.findById(userId);
     if(!existingUser){
         return res.status(404).json({
             message:"User not Exist"
         });
     }
     const existingOrder = await Order.findById(orderId);
     if(!existingOrder){
         return res.status(404).json({
             message:"Order not exist"
         });
     }
 
     if(existingOrder.user_id.toString() !== existingUser.id.toString()){
         return res.status(400).json({
             message:"Unutherized: User not own this order"
         });
     }
       await Order.findByIdAndDelete(orderId)
     return res.status(200).json({
         message:"Order Delete Successfully",
         existingOrder
     });
    } catch (error) {
     return res.status(500).json({
         message:error.message
     })
    }
 }

module.exports = {addOrders, getOrders,getSingleOrder,deleteOrder}