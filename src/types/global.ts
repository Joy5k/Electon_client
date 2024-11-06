import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};
export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};
export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};
export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean|React.Key;
};
export interface ImgBBResponseData {
  data: {
    url: string;
    // Add other properties here if needed
  };
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  data: AuthData;
}

interface AuthData {
  message: string;
  qrCode: string;
  secret: string;
}

export interface IQrCodeData {
  message: string;
  qrCode: string; 
  secret: string;
}
export interface IDivision {
  id: string; // Adjust according to actual API response
  division: string;
}

export interface IDistrict {
  id: string; // Adjust according to actual API response
  district: string;
}

export interface ISubDistrict {
  id: string; // Adjust according to actual API response
  upazillas: string[]
}
