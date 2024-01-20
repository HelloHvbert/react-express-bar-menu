import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import beerRouter from "./routes/beers";
import orderRouter from "./routes/orders";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(bodyParser.json());

app.use("/beers", beerRouter);
app.use("/orders", orderRouter);

// Connect to mongo
const username = "user";
const password = "password";
const MONGO_URL = `mongodb-link`;

mongoose
  .connect(MONGO_URL)
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

mongoose.connection.on("error", (err: Error) => {
  console.log(err);
});

mongoose.connection.once("open", async () => {
  console.log("Connected to DB");
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
