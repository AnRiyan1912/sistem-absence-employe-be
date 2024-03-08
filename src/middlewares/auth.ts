// const jwt = require('jsonwebtoken')
// import { NextFunction, Request, Response } from "express";

// export const requireAuth = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (!req.session.token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   jwt.verify(req.session.token, process.env.JWT_SECRET, (err, decoded) => {
//     if(err) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
//     req.userId = decoded.userId
//     next()
//   })
// };
