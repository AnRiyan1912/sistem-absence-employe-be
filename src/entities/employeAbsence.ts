import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Entity } from "./entity";
import { validationAbsence } from "../middlewares/validations";
import { AbsenceEmploye } from "../models/employeAbsence";
import { EmployeModel } from "./employe";
import { Employe } from "../models/employe";

export class EmployeAbsenceModel extends Entity {
  private employe: EmployeModel;

  constructor() {
    super();
    this.employe = new EmployeModel();
  }
  async save(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<any> {
    try {
      validationAbsence(req, res);
      const findEmploye: Employe = await this.employe.getById(
        req.body.employeId
      );

      const dateReq = new Date(req.body.absenceDate);
      req.body.absenceDate = dateReq.toISOString();
      const [hours, minute] = req.body.entryTime;
      req.body.entryTime = new Date(
        2024,
        0,
        1,
        parseInt(hours),
        parseInt(minute)
      ).toISOString();
      const saveAbsence =
        await EmployeAbsenceModel.prisma.employeAbsence.create({
          data: {
            absenceDate: req.body.absenceDate,
            entryTime: req.body.entryTime,
            exitTime: req.body.entryTime,
            information: req.body.information,
            employeId: findEmploye.id,
          },
        });
      res.status(200).json({
        message: "success save employe absence",
        employeAbsence: saveAbsence,
      });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
  async update(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<any> {
    try {
      validationAbsence(req, res);
      const checkAbsence: AbsenceEmploye = await this.getById(req.body.id);
      const [hours, minute] = req.body.exitTime;
      req.body.exitTime = new Date(
        2024,
        0,
        1,
        parseInt(hours),
        parseInt(minute)
      ).toISOString();
      const updateAbsence =
        await EmployeAbsenceModel.prisma.employeAbsence.update({
          where: { id: checkAbsence.id },
          data: {
            id: checkAbsence.id,
            absenceDate: checkAbsence.absenceDate,
            entryTime: req.body.entryTime,
            exitTime: req.body.exitTime,
            information: req.body.information,
            employeId: req.body.employeId,
            createdAt: req.body.createdAt,
            updatedAt: new Date().toISOString(),
          },
        });
      res.status(200).json({
        message: "success update employe absence",
        employeAbsence: updateAbsence,
      });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
  delete(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async getById(id: number): Promise<any> {
    const findAbsence =
      await EmployeAbsenceModel.prisma.employeAbsence.findUnique({
        where: { id: id },
      });

    if (!findAbsence) {
      throw new Error("Absence employe not found");
    }
    return findAbsence;
  }
  getAll(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
