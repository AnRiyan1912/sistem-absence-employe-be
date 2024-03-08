import e, { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Entity } from "./entity";
import {
  validationFindUserLoggin,
  validationUser,
} from "../middlewares/validations";
import { User } from "../models/user";

export class UserModel extends Entity {
  private id: number;
  private username: string;
  private email: string;
  private role: string;
  private craetedAt: Date;
  private updatedAt: Date;
  constructor() {
    super();
    this.id = 0;
    this.username = "";
    this.email = "";
    this.role = "";
    this.craetedAt = new Date();
    this.updatedAt = new Date();
  }
  async save(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    try {
      validationUser(req, res);
      const dataReq = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      };
      const checkExistEmail = await UserModel.prisma
        .$queryRaw`SELECT * FROM User where email = ${dataReq.email};`;
      if (checkExistEmail) {
        throw new Error("Email already use");
      }
      const checkExistUsername = await UserModel.prisma
        .$queryRaw`SELECT * FROM User where username = ${dataReq.username};`;
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
        createdAt: createUser[0].createdAt,
        updatedAt: createUser[0].updatedAt,
      });
    } catch (error: any) {
      res.status(400).json({ statusCode: 400, message: error.message });
      await UserModel.prisma.$executeRaw`ROLLBACK;`;
    } finally {
      await UserModel.prisma.$disconnect;
    }
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
    try {
      validationFindUserLoggin(req, res);
      const { email, username } = req.body;
      const findUser: User = await UserModel.prisma
        .$queryRaw`SELECT * FROM User WHERE email = ${email} OR username = ${username}`;
      if (!findUser) {
        throw new Error("unregistered users");
      }
      this.setUser({
        id: findUser.id,
        username: findUser.username,
        email: findUser.email,
        role: findUser.role,
        createdAt: findUser.createdAt,
        updatedAt: findUser.updatedAt,
      });
    } catch (error: any) {
      res.status(400).json({ status: 400, message: error.message });
    }
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
      createdAt: this.craetedAt,
      updatedAt: this.updatedAt,
    };
  }
}
