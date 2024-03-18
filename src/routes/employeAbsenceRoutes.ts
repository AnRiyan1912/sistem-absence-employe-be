import { Router } from "express";
import { employeAbsenceController } from "../controller/absenceController";

const express = require("express");
export const router: Router = express.Router();

router.post("/", employeAbsenceController.save.bind(employeAbsenceController));
router.put("/", employeAbsenceController.update.bind(employeAbsenceController));
