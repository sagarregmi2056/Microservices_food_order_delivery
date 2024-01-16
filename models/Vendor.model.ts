import mongoose, { Schema, Document, Model } from "mongoose";

interface vandorDoc extends Document {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  salt: string;
  serviceAvailable: string;
  coverImage: [string];
  rating: number;
  //   foods: any;
}

// creating a schema
const vandorSchema = new Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },

    foodType: { type: [String] },
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean },
    coverImages: { type: [String] },
    rating: { type: Number },
    // foods: [
    //   {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "food",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const Vandor = mongoose.model<vandorDoc>("vandor", vandorSchema);

export { Vandor };
