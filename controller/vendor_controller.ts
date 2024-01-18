import { Request, Response, NextFunction } from "express";
import { VendorLoginInput } from "../dto";
import { Findvandor } from "./Admin_Controller";
import { GnerateSignature, Validatepassword } from "../utility";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <VendorLoginInput>req.body;

  const existingUser = await Findvandor("", email);

  if (existingUser !== null) {
    const validation = await Validatepassword(
      password,
      existingUser.password,
      existingUser.salt
    );

    if (validation) {
      const signature = GnerateSignature({
        _id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
      });

      return res.json({ token: signature });
    } else {
      return res.json({ message: "password is not valid" });
    }
  }
  return res.json({ message: "ssasa" });
};

export const GetVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const UpdateVandorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const UpdateVandorServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
