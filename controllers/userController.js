const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Add Users
const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await user.create({
      name,
      email,
      password: hashPassword,
    });

    return res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
//Login Users

const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const existingUser = await user.findOne({email});
        if(!existingUser){
            return res.status(404).json({
                message:"User not Register"
            })
        }
        const compare = await bcrypt.compare(password,existingUser.password);
        if(!compare){
            return res.status(400).json({
                message:"Incorrect password"
            });
        }
       
        const jsonwebtoken = jwt.sign({
          
            id:existingUser.id,
            name:existingUser.name,
            email:existingUser.email,
        },
        process.env.JWT_KEY,{expiresIn:"1h"});
        return res.status(200).json({
            message:"User Login successfully",
            jsonwebtoken,
            existingUser
        });
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}



module.exports = { addUser,loginUser };