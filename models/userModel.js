const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
},{
    timestamps: true,
    strict:false
});

module.exports = mongoose.model("User",userSchema);