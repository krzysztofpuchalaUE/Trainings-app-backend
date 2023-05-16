import * as queries from "../database.js";
import express from "express";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export const router = express.Router();

router.post("/auth/signup", async (req, res) => {
  console.log("body:", req.body);
  const { registerFirstName, registerLastName, email, password } =
    req.body.data;

  const hashedPassword = bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const registerUser = await queries.registerUser(
    registerFirstName,
    registerLastName,
    email,
    hashedPassword
  );
  res.send(registerUser);

  // const token = createJson;
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userPassword = queries.loginUser(email);

  try {
    if (bcrypt.compare(password, userPassword)) {
      res.send("Success");
    } else {
      res.send("Not allowed");
    }
  } catch {
    res.status(500).send();
  }
});
