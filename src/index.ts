import { Application } from "express";
import { routes } from "./routes";

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/auth", routes.authRoute);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.listen(PORT, () => {
  console.log("Your server running at port ", PORT);
});

export default app;
