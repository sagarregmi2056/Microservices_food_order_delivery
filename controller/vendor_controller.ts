import { Request, Response, NextFunction } from "express";
import { VendorLoginInput } from "../dto";
import { Findvandor } from "./Admin_Controller";
import { Validatepassword } from "../utility";

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
      return res.json(existingUser);
    } else {
      return res.json({ message: "password is not valid" });
    }
  }
  return res.json({ message: "ssasa" });
};
