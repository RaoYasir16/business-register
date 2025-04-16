const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    customer_id:{
        type: mongoose.Schema.ObjectId,
        ref:"customer"
    },
    product_id:{
        type: mongoose.Schema.ObjectId,
        ref:"product"
    }
},{
    timestamps: true
});

module.exports = mongoose.model("orders",ordersSchema);