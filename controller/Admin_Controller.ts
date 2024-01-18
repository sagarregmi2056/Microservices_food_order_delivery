import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";

import { Vandor } from "../models/Index";
import { GenerateSalt, GnerateEncryptedPassword } from "../utility";

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

  const existingVendor = await Vandor.findOne({ email: email });

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
) => {};

export const GetVendorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
