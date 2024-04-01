import { UserModel } from "../entities/user";
import { EmployeImageModel } from "./employeImage";

export interface Employe {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeDetailResponse {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  user: UserModel;
  iamge: EmployeImageModel;
  createdAt: Date;
  updatedAt: Date;
}
