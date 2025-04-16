const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.ObjectId,
        ref:"user"
    },
    name:{
        type:String
    },
    address:{
        type:String
    },
   contact_number:{
        type: String
   },
},{
    timestamps: true
});

module.exports = mongoose.model("business",businessSchema);