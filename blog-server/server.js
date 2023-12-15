import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import User from "./model/User.js";
import { router } from "./routes/Auth.js";
const port = 2000;
const app = express();

app.use(express.json());
app.use(cors());

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

app.use("/auth", router);
async function main() {
  await mongoose.connect(process.env.DB_LOCATION, { autoIndex: true });
  console.log("database connected");
}

main().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
