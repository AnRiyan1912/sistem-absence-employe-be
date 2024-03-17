import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Entity } from "./entity";
import { validationAbsence } from "../middlewares/validations";
import { AbsenceEmploye } from "../models/employeAbsence";

export class EmployeAbsenceModel extends Entity {
  async save(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<any> {
    try {
      validationAbsence(req, res);

      const saveAbsence =
        await EmployeAbsenceModel.prisma.employeAbsence.create({
          data: {
            absenceDate: req.body.absenceDate,
            entryTime: req.body.entryTime,
            exitTime: req.body.exitTime,
            information: req.body.information,
          },
        });
      res.status(200).json({ employeAbsence: saveAbsence });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
  async update(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<any> {
    try {
      const checkAbsence: AbsenceEmploye = await this.getById(req.body.id);
      const date = new Date();
      const updateAbsence =
        await EmployeAbsenceModel.prisma.employeAbsence.update({
          where: { id: checkAbsence.id },
          data: {
            id: checkAbsence.id,
            absenceDate: checkAbsence.absenceDate,
            entryTime: req.body.entryTime,
            exitTime: req.body.exitTime,
            information: req.body.information,
            createdAt: req.body.createdAt,
            updatedAt: date.toISOString(),
          },
        });
      res.status(200).json({ employeAbsence: updateAbsence });
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
