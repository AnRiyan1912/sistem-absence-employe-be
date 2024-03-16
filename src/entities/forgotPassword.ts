import e, { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Entity } from "./entity";
import {
  validationSaveFogotPassword,
  validationUpdateStatusVerify,
} from "../middlewares/validations";

export class ForgotPasswordModel extends Entity {
  async save(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<any> {
    validationSaveFogotPassword(req, res);
    const { email, verificationCode, userId } = req.body;
    return await ForgotPasswordModel.prisma.forgotPassword.create({
      data: {
        email: email,
        verificationCode: verificationCode,
        userId: userId,
        verifyStatus: false,
      },
    });
  }
  async update(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<any> {
    validationUpdateStatusVerify(req, res);
    const { id, email, createdAt } = req.body;
    const dateNow = new Date();

    return await ForgotPasswordModel.prisma.forgotPassword.update({
      where: {
        id: id,
        email: email,
        verifyStatus: false,
        createdAt: createdAt,
      },
      data: {
        id: id,
        email: email,
        verifyStatus: true,
        updatedAt: dateNow.toISOString(),
      },
    });
  }
  delete(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async getById(id: number): Promise<any> {
    const findUser = await ForgotPasswordModel.prisma.forgotPassword.findUnique(
      {
        where: { id: id },
      }
    );
    return findUser;
  }
  getAll(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
