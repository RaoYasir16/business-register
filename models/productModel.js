const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    category_id:{
        type: mongoose.Schema.ObjectId,
        ref:"category"
    },
    name:{
        type: String
    },
    description:{
        type: String
    },
    price:{
        type: Float
    },
    quantity:{
        type:Integer
    }
},{
    timestamps: true
});

module.exports = mongoose.model("product",productSchema)