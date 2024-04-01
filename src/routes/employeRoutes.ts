import { Router } from "express";
import { employeController } from "../controller/employeController";

const express = require("express");
export const router: Router = express.Router();

router.get("/:id", employeController.getEmployeDetail.bind(employeController));
