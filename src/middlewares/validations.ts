import { Request, Response } from "express";

export const validationUser = (req: Request, res: Response) => {
  let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let regexPassword = /^(?=.*[@$!%*?&])(?=.*[A-Z]).{8,}$/;
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
  if (regexEmail.test(req.body.email) == false) {
    throw new Error("Invalid email");
  }
  if (req.body.password.length <= 8) {
    throw new Error("Password must be 8 character");
  }
  if (regexPassword.test(req.body.password) == false) {
    throw new Error("Password must have symbol and letter uppecase");
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
  if (
    req.body.usernameOrEmail == undefined ||
    req.body.usernameOrEmail == "" ||
    req.body.usernameOrEmail == " "
  ) {
    throw new Error("username is empety");
  }
  if (req.body.password == undefined || req.body.password == "") {
    throw new Error("passwords is empety");
  }
};

export const validationForgotPassword = (req: Request, res: Response) => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    req.body.email == "" ||
    req.body.email == " " ||
    req.body.email == undefined
  ) {
    throw new Error("Email required");
  }
  if (regexEmail.test(req.body.email) == false) {
    throw new Error("Email invalid please input email correct");
  }
};

export const validationSaveFogotPassword = (req: Request, res: Response) => {
  const { email, verificationCode, userId } = req.body;
  if (email == " " || email == "" || email == undefined) {
    throw new Error("Email required");
  }
  if (!verificationCode) {
    throw new Error("Verification code is empety");
  }
  if (!userId) {
    throw new Error("UserId is empety");
  }
};

export const validationUpdateStatusVerify = (req: Request, res: Response) => {
  const { id, email, verificationCode, userId, createdAt } = req.body;

  if (!id) {
    throw new Error("id is empty");
  }
  if (!email) {
    throw new Error("email is empty");
  }
  if (!verificationCode) {
    throw new Error("verificationCode is empty");
  }
  if (!userId) {
    throw new Error("userId is empty");
  }
  if (!createdAt) {
    throw new Error("createdAt is empty");
  }
};

export const validationMatchPassword = (req: Request, res: Response) => {
  if (req.body.password !== req.body.passwordAgain) {
    throw new Error("Password not match");
  }
};

export const validationAbsence = (req: Request, res: Response) => {
  if (!req.body.absenceDate) {
    throw new Error("absenceDate is required");
  }
  if (!req.body.entryTime) {
    throw new Error("entryTime is required");
  }
  if (!req.body.exitTime) {
    throw new Error("exitTime is required");
  }
  if (!req.body.information) {
    throw new Error("information is required");
  }
};

export const checkUtcTime = (dateReq: Date, columnName: string) => {
  const isUTCTime =
    dateReq.getUTCFullYear() == dateReq.getFullYear() &&
    dateReq.getUTCMonth() == dateReq.getMonth() &&
    dateReq.getUTCDate() == dateReq.getDate() &&
    dateReq.getUTCHours() == dateReq.getHours() &&
    dateReq.getUTCMinutes() == dateReq.getMinutes() &&
    dateReq.getUTCSeconds() == dateReq.getSeconds();

  if (!isUTCTime) {
    throw new Error(columnName + "not time utc format");
  }
};
