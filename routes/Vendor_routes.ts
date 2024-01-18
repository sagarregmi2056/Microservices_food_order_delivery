import express, { Request, Response, NextFunction } from "express";
import { GetVandorProfile, UpdateVandorProfile, UpdateVandorServices, login } from "../controller/Index_Controller";




const router = express.Router();



router.post('/login',login);
router.get('/profile',GetVandorProfile);
router.patch('/profile',UpdateVandorProfile)
router.patch('/services',UpdateVandorServices)





router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "hello from the admin routes" });
});

export { router as Vendor_routes };
