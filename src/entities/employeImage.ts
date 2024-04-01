import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Entity } from "./entity";
import { EmployeImageModel } from "../models/employeImage";

export class EmployeImage extends Entity {
  async save(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<EmployeImageModel> {
    const saveImage = await EmployeImage.prisma.employeImage.create({
      data: { url: req.body.url },
    });
    return saveImage;
  }
  update(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async getById(id: number): Promise<EmployeImageModel> {
    const findImage = await EmployeImage.prisma.employeImage.findUnique({
      where: { id: id },
    });
    if (!findImage) {
      throw new Error("employe image not found");
    }
    return findImage;
  }
  getAll(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  constructor() {
    super();
  }
}
