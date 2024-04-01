import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { EmployeModel } from "./employe";
import { UserModel } from "./user";
import {
  validationEmployee,
  validationForgotPassword,
  validationMatchPassword,
  validationUser,
} from "../middlewares/validations";
import { sendMailMessageVerification } from "../utils/sendMailMessage";
import { mathRandomSixDigist } from "../utils/mathRandom";
import { ForgotPasswordModel } from "./forgotPassword";
import { ForgotPassword } from "@prisma/client";
import { EmployeImage } from "./employeImage";

const jwt = require("jsonwebtoken");

export class Auth {
  private user: UserModel;
  private employe: EmployeModel;
  private forgotPassword: ForgotPasswordModel;
  private employeImage: EmployeImage;
  constructor() {
    this.user = new UserModel();
    this.employe = new EmployeModel();
    this.forgotPassword = new ForgotPasswordModel();
    this.employeImage = new EmployeImage();
  }
  async register(req: Request, res: Response): Promise<void> {
    try {
      validationUser(req, res);
      req.body.password = await hashPassword(req.body.password);
      await this.user.save(req, res);
      const responseCreateUser = this.user.getUser();
      req.body.userId = responseCreateUser.id;
      req.body.url = req.file?.filename;
      const responseCreateImage = await this.employeImage.save(req, res);
      req.body.employeImageId = responseCreateImage.id;
      validationEmployee(req, res);
      await this.employe.save(req, res);
      const responseCreateEmploye = this.employe.getEmploye();
      res.status(200).json({
        status: 200,
        message: "Success register",
        data: { ...responseCreateUser, employe: responseCreateEmploye },
      });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
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
  async onForgotPassword(req: Request, res: Response) {
    try {
      validationForgotPassword(req, res);
      const findUser = await this.user.getByUserEmail(req, res);
      const verifyCode = mathRandomSixDigist();
      req.body.verificationCode = verifyCode;
      req.body.userId = findUser.id;
      sendMailMessageVerification(findUser.email, verifyCode);
      const saveToDatabase = await this.forgotPassword.save(req, res);
      res.status(200).json({
        status: 200,
        message: "Verification code sent to email successfully",
        data: {
          id: saveToDatabase.id,
          email: saveToDatabase.email,
          createdAt: saveToDatabase.createdAt,
        },
      });
    } catch (err: any) {
      res.status(400).json({ status: 400, message: err.message });
    }
  }
  async verifyCodeForgotPassword(req: Request, res: Response) {
    try {
      const id: number = req.body.id;
      const findHistory: ForgotPassword = await this.forgotPassword.getById(id);
      if (!findHistory) {
        throw new Error("History forgot not found");
      }
      req.body.userId = findHistory.id;
      if (
        findHistory.verificationCode !== parseInt(req.body.verificationCode)
      ) {
        throw new Error("Verification code is wrong please input corectly");
      }
      this.forgotPassword.update(req, res);
      res.status(200).json({ status: 200, message: "success verify" });
    } catch (err: any) {
      res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  }
  async updatePassword(req: Request, res: Response) {
    try {
      validationForgotPassword(req, res);
      validationMatchPassword(req, res);
      const id: number = req.body.id;
      const hash = await hashPassword(req.body.password);
      req.body.password = hash;
      const checkVerify = await this.forgotPassword.getById(id);
      if (checkVerify.verifyStatus == true) {
        await this.user.updatePassword(req, res);
        res
          .status(200)
          .json({ status: 200, message: "success update password" });
      } else {
        res.status(400).json({
          status: 400,
          message: "failed update password because it has not been verified",
        });
      }
    } catch (err: any) {
      res.status(400).json({ status: 400, message: err.message });
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
        { expiresIn: "10m" }
      );
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .header("Authorization", `Bearer ${accessToken}`)
        .status(200)
        .json({ accessToken: accessToken });
    } catch (error: any) {
      return res.status(400).send("Invalid Token");
    }
  }
}
