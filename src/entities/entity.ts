import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export abstract class Entity {
  abstract save(req: Request, res: Response): Promise<any>;
  abstract update(req: Request, res: Response): Promise<any>;
  abstract delete(req: Request, res: Response): Promise<any>;
  abstract getById(id: number): Promise<any>;
  abstract getAll(): Promise<any>;

  static prisma = prisma;
}
