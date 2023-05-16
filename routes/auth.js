import * as queries from "../database.js";
import express from "express";
import bcrypt, { hash } from "bcrypt";
import * as jwt from "jsonwebtoken";

export const router = express.Router();

router.post("/auth/signup", async (req, res) => {
  console.log("body:", req.body);
  const { registerFirstName, registerLastName, email, password } =
    req.body.data;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async function (err, hash) {
      req.body.password = hash;
      const registerUser = await queries.registerUser(
        registerFirstName,
        registerLastName,
        email,
        req.body.password
      );
      res.send(registerUser);
    });
  });

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
