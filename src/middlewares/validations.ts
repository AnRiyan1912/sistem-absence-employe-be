import { Request, Response } from "express";

export const validationUser = (req: Request, res: Response) => {
  if (req.body.username == undefined || req.body.username == "") {
    throw new Error("username is empety");
  }
  if (req.body.email == undefined) {
    throw new Error("email is empety");
  }
  if (req.body.password == undefined) {
    throw new Error("password is empety");
  }
  if (req.body.role == undefined) {
    throw new Error("role is empety");
  }
};

export const validationEmployee = (req: Request, res: Response) => {
  if (req.body.firstName == undefined) {
    throw new Error("firstName is empety");
  }
  if (req.body.lastName == undefined) {
    throw new Error("lastName is empety");
  }
  if (req.body.age == undefined) {
    throw new Error("age is empety");
  }
  if (req.body.address == undefined) {
    throw new Error("address is empety");
  }
  if (req.body.userId == undefined) {
    throw new Error("userId is empety");
  }
};

export const validationFindUserLoggin = (req: Request, res: Response) => {
  if (req.body.usernameOrEmail == undefined || req.body.usernameOrEmail == "") {
    throw new Error("username is empety");
  }
  if (req.body.password == undefined || req.body.password == "") {
    throw new Error("passwords is empety");
  }
};
