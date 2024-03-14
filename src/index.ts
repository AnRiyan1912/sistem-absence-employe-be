import { Application } from "express";
import { routes } from "./routes";

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
app.get("/post", (req, res) => {
  res.send("INI content POST");
});
app.listen(PORT, () => {
  console.log("Your server running at port ", PORT);
});

export default app;
