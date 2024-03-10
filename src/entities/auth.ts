import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { Session } from "express-session";
import { EmployeModel } from "./employe";
import { UserModel } from "./user";
import { CustomeSession } from "../models/session";
const jwt = require("jsonwebtoken");

export class Auth {
  // user: UserModel;
  // employe: EmployeModel;
  // constructor() {
  //   this.user = new UserModel();
  //   this.employe = new EmployeModel();
  // }
  async register(req: Request, res: Response): Promise<void> {
    try {
      req.body.password = await hashPassword(req.body.password);
      const user = new UserModel();
      await user.save(req, res);
      const responseCreateUser = user.getUser();

      req.body.userId = responseCreateUser.id;
      const employe = new EmployeModel();
      await employe.save(req, res);
      const responseCreateEmploye = employe.getEmploye();
      res.status(200).json({
        status: 200,
        message: "Success register",
        data: { ...responseCreateUser, employe: responseCreateEmploye },
      });
    } catch (error: any) {
      res.status(400).json({ status: 400, message: error.message });
    }
  }
  async login(req: Request, res: Response): Promise<void> {
    try {
      const user = new UserModel();
      const findUser = await user.getByUserNameOrEmail(req, res);
      const checkPassword = await comparePassword(
        req.body.password,
        findUser.password
      );
      if (!checkPassword) {
        throw new Error("Username or password wrong");
      }
      const employe = new EmployeModel();
      const findEmploye = await employe.getByUserId(findUser.id);
      const accessToken = jwt.sign(
        { userId: findEmploye.id, role: findUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
      );
      const refreshToken = jwt.sign(
        { userId: findEmploye.id, role: findUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .status(200)
        .json({ accessToken: accessToken });
    } catch (error: any) {
      res.status(400).json({ status: 400, message: error.message });
    }
  }
  refreshToken(req: Request, res: Response) {
    const refreshToken = req.headers.cookie?.split("=")[1];

    if (!refreshToken) {
      return res.status(400).send("Access denied, no refresh token provided");
    }
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      const accessToken = jwt.sign(
        { userId: decoded.id, role: decoded.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .header("Authorization", `Bearer ${accessToken}`)
        .sendStatus(200);
    } catch (error: any) {
      return res.status(400).send("Invalid Token");
    }
  }
}
