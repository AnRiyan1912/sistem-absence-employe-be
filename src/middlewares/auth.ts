import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

interface AuthenticationRequest extends Request {
  userId?: any;
}

export const authenticate = (
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers["authorization"];

  try {
    if (!accessToken) {
      return res.status(401).send("Access denied, no token provided");
    }
    const token = accessToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error: any) {
    return res.status(401).send("Access denied, no token provided");
  }
};
