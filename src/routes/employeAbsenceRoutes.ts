import { Router } from "express";
import { employeAbsenceController } from "../controller/absenceController";

const express = require("express");
export const router: Router = express.Router();

router.post(
  "/employe_absence",
  employeAbsenceController.save.bind(employeAbsenceController)
);
router.put(
  "/employe_absence",
  employeAbsenceController.update.bind(employeAbsenceController)
);
