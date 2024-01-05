import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import User from "./model/User.js";
import admin from "firebase-admin";
import { router } from "./routes/Auth.js";
import { getAuth } from "firebase-admin/auth";
import serviceAccountKey from "./test-auth-2e024-firebase-adminsdk-hxrc0-64d4235ff2.json" assert { type: "json" };

const port = 2000;
const app = express();

app.use(express.json());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

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
