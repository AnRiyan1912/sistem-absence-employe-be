import { Application } from "express";
import { routes } from "./routes";
import { authenticate } from "./middlewares/auth";

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/auth", routes.authRoute);

app.use(authenticate);
app.get("/post", (req, res) => {
  res.send("INI content POST");
});
app.listen(PORT, () => {
  console.log("Your server running at port ", PORT);
});

export default app;
