import * as queries from "../database.js";
import express from "express";
import bcrypt, { hash } from "bcrypt";

export const router = express.Router();
import { generateAuthToken } from "../utils/authToken.js";

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
          const authenticationToken = generateAuthToken({ email: email });
          res.json({ authToken: authenticationToken });
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
