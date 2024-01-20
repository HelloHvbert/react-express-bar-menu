import mongoose from "mongoose";

const BeerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tableNumber: {
    type: Number,
    required: true,
  },
  beers: [BeerSchema],
  orderTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
