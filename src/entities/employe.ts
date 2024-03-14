import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Entity } from "./entity";
import { validationEmployee } from "../middlewares/validations";
import { Employe } from "../models/employe";

export class EmployeModel extends Entity {
  private id: number;
  private firstName: string;
  private lastName: string;
  private age: number;
  private address: string;
  private userId: number;
  private createdAt: Date;
  private updatedAt: Date;
  constructor() {
    super();
    this.id = 0;
    this.firstName = "";
    this.lastName = "";
    this.age = 0;
    this.address = "";
    this.userId = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  async save(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<any> {
    const dataReq = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: parseInt(req.body.age),
      address: req.body.address,
      userId: req.body.userId,
    };
    const createEmploye = await EmployeModel.prisma.$transaction([
      EmployeModel.prisma.employe.create({
        data: dataReq,
      }),
    ]);
    this.setEmploye({
      id: createEmploye[0].id,
      firstName: createEmploye[0].firstName,
      lastName: createEmploye[0].lastName,
      age: createEmploye[0].age,
      address: createEmploye[0].address,
      userId: createEmploye[0].userId,
      createdAt: createEmploye[0].createdAt,
      updatedAt: createEmploye[0].updatedAt,
    });
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
  getById(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async getByUserId(id: number): Promise<Employe> {
    const findEmploye = await EmployeModel.prisma.employe.findUnique({
      where: {
        userId: id,
      },
    });
    if (!findEmploye) {
      throw new Error("Employe not found with user id: " + id);
    }
    return findEmploye;
  }
  setEmploye(employe: Employe): void {
    this.id = employe.id;
    this.firstName = employe.firstName;
    this.lastName = employe.lastName;
    this.age = employe.age;
    this.address = employe.address;
    this.userId = employe.userId;
    this.createdAt = employe.createdAt;
    this.updatedAt = employe.updatedAt;
  }
  getEmploye(): Employe {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
      address: this.address,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
