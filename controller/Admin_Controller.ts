import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";

import { Vandor } from "../models/Index";

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

  const createvandor = await Vandor.create({
    name: name,
    address: address,

    pincode: pincode,
    foodType: foodType,
    email: email,
    password: password,
    ownerName: ownerName,
    phone: phone,
    rating: 0,
    serviceAvailable: false,
    coverImage: [],
  });

  res.json({
    name,
    address,
    pincode,
    foodType,
    email,
    password,
    ownerName,
    phone,
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
