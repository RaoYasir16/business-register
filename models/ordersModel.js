const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    customer_id:{
        type: mongoose.Schema.ObjectId,
        ref:"customer"
    },
    product_id:{
        type: mongoose.Schema.ObjectId,
        ref:"product"
    },
    user_id:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    }
},{
    timestamps: true
});

module.exports = mongoose.model("orders",ordersSchema);