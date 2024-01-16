import express from "express";

import bodyParser from "body-parser";

import {
  Admin_routes,
  User_routes,
  Vendor_routes,
} from "./routes/Index_routes";

const app = express();

// bodyparser for json type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8832;

app.use("/admin", Admin_routes);
app.use("/vendor", Vendor_routes);
app.use("/user", User_routes);

app.get("/", (req, res) => {
  return res.json("Hello from the backend");
});

app.listen(PORT, () => {
  console.clear();
  console.log(`server is starting at port ${PORT}`);
});
