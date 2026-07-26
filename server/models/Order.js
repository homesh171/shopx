const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, default: "Processing" },
  shippingAddress: {
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    postcode: String,
    phone: String,
  },
  paymentId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);