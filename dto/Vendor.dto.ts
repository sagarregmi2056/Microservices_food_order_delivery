export interface CreateVendorInput {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface VendorLoginInput {
  email: string;
  password: string;
}



export interface Vandorpayload{
  _id:string,
  email:string,
  name:string,
  
}