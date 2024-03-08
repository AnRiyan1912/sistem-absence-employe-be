import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { Session } from "express-session";
import { EmployeModel } from "./employe";
import { UserModel } from "./user";
const jwt = require("jsonwebtoken");

export class Auth {
  user: UserModel;
  employe: EmployeModel;
  constructor() {
    this.user = new UserModel();
    this.employe = new EmployeModel();
  }
  async register(req: Request, res: Response): Promise<void> {
    try {
      req.body.password = await hashPassword(req.body.password);
      await this.user.save(req, res);
      const responseCreateUser = this.user.getUser();

      req.body.userId = responseCreateUser.id;
      await this.employe.save(req, res);
      const responseCreateEmploye = this.employe.getEmploye();
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
      const findUser = await this.user.getByUserNameOrEmail(req, res);
      const checkPassword = await comparePassword(
        req.body.usernameOrEmail,
        findUser.password
      );
      if (!checkPassword) {
        throw new Error("Username or password wrong");
      }
      const findEmploye = await this.employe.getByUserId(findUser.id);
      const token = jwt.sign(
        { userId: findEmploye.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      (req.session as Session) = token;
    } catch (error: any) {
      res.status(400).json({ status: 400, message: error.message });
    }
  }
}
