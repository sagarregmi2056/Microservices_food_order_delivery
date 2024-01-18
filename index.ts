import express from "express";

import bodyParser from "body-parser";

// import mongoose from "mongoose";
import { ConnectOptions, connect } from "mongoose";

import {
  Admin_routes,
  User_routes,
  Vendor_routes,
} from "./routes/Index_routes";

import { MONGO_URI } from "./config";

const app = express();

// bodyparser for json type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8832;

const connectionOptions: ConnectOptions = {};

// this will execute a connection with  db and server
async function run() {
  await connect(MONGO_URI, connectionOptions);
  app.listen(PORT, () => {
    console.clear();
    console.log(`server is starting at port ${PORT}`);
  });
}

app.use("/admin", Admin_routes);
app.use("/vendor", Vendor_routes);
app.use("/user", User_routes);

app.get("/", (req, res) => {
  return res.json("Hello from the backend");
});

// calling run function
run();
