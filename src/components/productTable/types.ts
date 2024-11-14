export interface IProductData {
    success: boolean;
    message: string;
    meta: {
      page: number;
      limit: number;
      total: number;
    };
    data: Product[];
  }
  
  interface Product {
    _id: string;
    title: string;
    description: string;
    image: string;
    color: string[];
    quantity: number;
    price: number;
    rating: number;
    __v: number;
    sellerId?: Seller;
  }
  
  interface Seller {
    secret: {
      ascii: string;
      hex: string;
      base32: string;
      otpauth_url: string;
    };
    gender: string;
    _id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: string;
    friends: any[];
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    phoneNumber: string;
    image: string;
    auth2: boolean;
    address: Address;
    description: string;
  }
  
  interface Address {
    district: string;
    division: string;
    subDistrict: string;
    roadNo: string;
    postCode: number;
    _id: string;
  }
  