import { Application } from "express";
import { routes } from "./routes";
import { preAutorize } from "./middlewares/auth";

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// const bodyParser = require("body-parser");
export const fs = require("fs");

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors({ origin: "http://localhost:5173" }));
// app.use(authenticate);
app.use("/auth", routes.authRoute);
app.use("/absence_employe", routes.employeAbsenceRoute);
app.use("/employe", routes.employeRoute);
app.get("/post", preAutorize("MANAGER"), (req, res) => {
  res.status(200).json({ message: "success" });
});
app.use(
  "/public/profiles",
  express.static(`${__dirname}/public/images/profile`)
);
app.listen(PORT, () => {
  console.log("Your server running at port ", PORT);
});

export default app;
