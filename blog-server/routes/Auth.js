import express from "express";

import { createUser, loginUser } from "../controller/Auth.js";

export const router = express.Router();

router.post("/signup", createUser).post("/sign-in", loginUser)
