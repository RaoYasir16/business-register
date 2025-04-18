const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    business_id:{
        type: mongoose.Schema.ObjectId,
        ref:"business"
    },
    category_name:{
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model("category",categorySchema);