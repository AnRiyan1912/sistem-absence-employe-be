import { Router } from "express"
import { authController } from "../controller/authController"


const express = require('express')
export const router:Router = express.Router()

router.post('/register', authController.register)
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);