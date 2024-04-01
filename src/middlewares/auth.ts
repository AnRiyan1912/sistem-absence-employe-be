import { log } from "console";
import { NextFunction, Request, Response, response } from "express";

const jwt = require("jsonwebtoken");

interface AuthenticationRequest extends Request {
  userId?: any;
}

interface AuthorizationRequest extends Request {
  accessToken?: any;
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

export const preAutorize = (...role: string[]) => {
  return (req: AuthorizationRequest, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      const tokenData = jwt.verify(accessToken, process.env.JWT_SECRET);
      if (tokenData.role != role) {
        res.status(403).json({ status: 403, message: "Forbidden" });
      } else {
        next();
      }
    } catch (err: any) {
      res.status(403).json({ message: err.message });
    }
  };
};
