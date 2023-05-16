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

router.post("/auth/login", async (req, res) => {
  const email = req.body.data[0];
  const password = req.body.data[1];
  const userPassword = await queries.loginUser(email);

  try {
    bcrypt.compare(
      password + "",
      userPassword[0].user_password + "",
      (err, result) => {
        if (result) {
          console.log("OK");
          res.sendStatus(200);
        } else {
          console.log("Wrong password");
          res.sendStatus(401);
        }
      }
    );
  } catch {
    res.status(500).send();
  }
});
