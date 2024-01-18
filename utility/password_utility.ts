import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Vandorpayload } from "../dto";
import { SECRET } from "../config";
import { Request } from "express";
import { Authpayload } from "../dto/Auth.dto";

// this function is responsible to generate a salt
export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

// this function is responsible to generateencrypted password
export const GnerateEncryptedPassword = async (
  password: string,
  salt: string
) => {
  return await bcrypt.hash(password, salt);
};

export const Validatepassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (
    (await GnerateEncryptedPassword(enteredPassword, salt)) === savedPassword
  );
};

export const GnerateSignature = (payload: Vandorpayload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "365d" });
};

export const validateSignature = async (req: Request) => {
  const signature = req.get("Authorization");
  if (signature) {
    const payload = (await jwt.verify(
      signature.split(" ")[1],
      SECRET
    )) as Authpayload;

    req.user = payload;
    return true;
  }
  return false;
};
