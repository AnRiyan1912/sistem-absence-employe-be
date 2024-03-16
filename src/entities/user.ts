import e, { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Entity } from "./entity";
import {
  validationFindUserLoggin,
  validationForgotPassword,
} from "../middlewares/validations";
import { User } from "../models/user";

export class UserModel extends Entity {
  private id: number;
  private username: string;
  private email: string;
  private role: string;
  private password: string;
  private craetedAt: Date;
  private updatedAt: Date;
  constructor() {
    super();
    this.id = 0;
    this.username = "";
    this.email = "";
    this.role = "";
    this.password = "";
    this.craetedAt = new Date();
    this.updatedAt = new Date();
  }
  async save(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const dataReq = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
    const checkExistEmail = await UserModel.prisma.user.findUnique({
      where: { email: dataReq.email },
    });
    if (checkExistEmail) {
      throw new Error("Email already use");
    }
    const checkExistUsername = await UserModel.prisma.user.findUnique({
      where: { username: dataReq.username },
    });
    if (checkExistUsername) {
      throw new Error("Username already use");
    }
    const createUser = await UserModel.prisma.$transaction([
      UserModel.prisma.user.create({
        data: dataReq,
      }),
    ]);
    this.setUser({
      id: createUser[0].id,
      username: createUser[0].username,
      email: createUser[0].email,
      role: createUser[0].role,
      password: createUser[0].password,
      createdAt: createUser[0].createdAt,
      updatedAt: createUser[0].updatedAt,
    });
  }
  update(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getById(id: number): Promise<any> {}
  getAll(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async getByUserNameOrEmail(req: Request, res: Response): Promise<any> {
    validationFindUserLoggin(req, res);
    const { usernameOrEmail, email } = req.body;
    const findUser = await UserModel.prisma.user.findFirst({
      where: {
        OR: [
          { username: usernameOrEmail },
          { email: usernameOrEmail || email },
        ],
      },
    });
    if (!findUser) {
      throw new Error("Unregistered users");
    }
    return findUser;
  }
  async getByUserEmail(req: Request, res: Response): Promise<any> {
    validationForgotPassword(req, res);
    const email: string = req.body.email;
    const findUser = await UserModel.prisma.user.findUnique({
      where: { email: email },
    });
    if (!findUser) {
      throw new Error("Unregistered users");
    }
    return findUser;
  }
  async updatePassword(req: Request, res: Response) {
    const email: string = req.body.email;
    req.body.email = email;
    const findUser: User = await this.getByUserEmail(req, res);
    return await UserModel.prisma.user.update({
      where: { email: findUser.email },
      data: { password: req.body.password },
    });
  }
  setUser(user: User): void {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.role = user.role;
    this.craetedAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  getUser(): User {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      role: this.role,
      password: this.password,
      createdAt: this.craetedAt,
      updatedAt: this.updatedAt,
    };
  }
}
