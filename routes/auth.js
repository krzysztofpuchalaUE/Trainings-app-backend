import * as queries from "../database.js";
import express from "express";
import bcrypt, { hash } from "bcrypt";

export const router = express.Router();
import { generateAuthToken } from "../utils/authToken.js";
import * as validation from "../validation/validation.js";

router.post("/auth/signup", async (req, res) => {
  const { registerFirstName, registerLastName, email, password } =
    req.body.data;

  let errors = {};

  if (!validation.isFirstNameValid) {
    return (errors.firstName = "Invalid first name");
  }

  if (!validation.isLastNameValid) {
    return (errors.lastName = "Invalid last name");
  }

  if (!validation.isEmailValid) {
    return (errors.email = "Invalid email");
  }

  if (!validation.isPasswordValid) {
    return (errors.password = "Invalid password");
  }

  if (Object.keys(errors).length > 0) {
    return res
      .status(422)
      .json({ message: "Register failed due to validation error", errors });
  }

  try {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async function (err, hash) {
        req.body.password = hash;
        const registerUser = await queries.registerUser(
          registerFirstName,
          registerLastName,
          email,
          req.body.password
        );
        res.json({ message: "User succesfully registered" });
      });
    });
  } catch {
    res.status(500).json({ message: "Register user failed" });
  }
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
    res
      .status(422)
      .json({ message: "Login user failed due to validation errors" });
  }
});
