import express, { Request, Response, NextFunction } from "express";

import {
  CreateVendor,
  GetVendor,
  GetVendorByID,
} from "../controller/Index_Controller";

// creating instant of router from express router
const router = express.Router();

router.post("/vendor", CreateVendor);
router.get("/vendor", GetVendor);
router.get("/vendor/:id", GetVendorByID);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "hello from the admin routes" });
});

export { router as Admin_routes };
