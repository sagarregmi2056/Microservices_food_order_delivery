import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";

import { Vandor } from "../models/Index";
import { GenerateSalt, GnerateEncryptedPassword } from "../utility";

// it will find by id if email is provided it will saarch for other

export const Findvandor = async (id: string | undefined, email?: string) => {
  if (email) {
    return await Vandor.findOne({ email: email });
  } else {
    return await Vandor.findById(id);
  }
};

export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    address,
    pincode,
    foodType,
    email,
    password,
    ownerName,
    phone,
  } = <CreateVendorInput>req.body;

  // checking vendor exist or not

  const existingVendor = await Findvandor("", email);

  if (existingVendor !== null) {
    return res.json({
      message: "vendor already exist with the given email id",
    });
  }

  // generate the salt
  const salt = await GenerateSalt();

  const userpassword = await GnerateEncryptedPassword(password, salt);

  // use salt to encrypt using salt

  // if doesnt exist it will create a new vendor
  const createdvandor = await Vandor.create({
    name: name,
    address: address,
    pincode: pincode,
    foodType: foodType,
    email: email,
    password: userpassword,
    ownerName: ownerName,
    salt: salt,
    phone: phone,
    rating: 0,
    serviceAvailable: false,
    coverImage: [],
  });

  res.json({
    createdvandor,
  });
};

export const GetVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vandor = await Vandor.find();
  if (vandor !== null) {
    return res.json(vandor);
  }

  return res.json({ message: "There is no any vandor on database" });
};

export const GetVendorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vandorbyid = req.params.id;

  const vandor = await Findvandor(vandorbyid);

  if (vandor !== null) {
    return res.json(vandor);
  }
  return res.json({ message: "there is no any vendor associate by the id" });
};

// export const GetVendorByemail = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const vandorbyemail = req.params.email;

//   const vandor = await Findvandor(vandorbyemail);

//   if (vandor !== null) {
//     return res.json(vandor);
//   }
//   return res.json({ message: "there is no any vendor associate by the id" });
// };
