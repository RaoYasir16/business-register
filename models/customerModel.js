const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    business_id:{
        type: mongoose.Schema.ObjectId,
        ref:"business"
    },
    name:{
        type: String
    },
    email:{
        type: String
    },
    address:{
        type: String
    }
},{
    timestamps: true
});

module.exports = mongoose.model("customers",customerSchema);