import Express from "express";
import mongoose from "mongoose";
import Beer from "../models/beers";
import Order from "../models/orders";

const router = Express.Router();

//Get next extra id for params
const getMaxOrderId = async () => {
  try {
    const orderWithMaxId = await Order.findOne()
      .sort("-id")
      .select("id -_id")
      .exec();
    if (orderWithMaxId) {
      return orderWithMaxId.id; // return max id
    } else {
      return null; //
    }
  } catch (err) {
    console.error("Error:", err);
    return null; // no orders
  }
};

// Get order by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ id: +id }).exec();
    if (order === null)
      res.status(404).json({ message: `Order ${id} not found` });
    else res.status(200).json(order);
  } catch (err) {
    console.error("Wystąpił błąd podczas pobierania zamówień:", err);
    res.sendStatus(500);
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().exec();
    if (!orders) {
      res.status(404).json({ message: `Orders not found` });
      return;
    }
    res.json(orders);
  } catch (err) {
    console.error("Error while getting orders:", err);
    res.sendStatus(500);
  }
});

// Create new order
router.post("/", async (req, res) => {
  const nextId = (await getMaxOrderId()) + 1;
  const { customerName, email, tableNumber, beers, totalPrice } = req.body;

  const newOrder = new Order({
    id: nextId,
    customerName: customerName,
    email: email,
    beers: beers,
    tableNumber: tableNumber,
    orderTime: new Date(),
    totalPrice: totalPrice,
  });

  newOrder
    .save()
    .then(() => {
      console.log("Order saved");
    })
    .catch((err: Error) => {
      console.error("Error while creating order:", err);
      res.sendStatus(500);
    });

  res.status(201).json({ message: "Order created", orderId: nextId });
});

export default router;
