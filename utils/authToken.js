import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function generateAuthToken(email) {
  return jwt.sign(email, process.env.AUTH_TOKEN, { expiresIn: "60m" });
}

export function authenticateToken(req, res, next) {
  const headers = req.headers["authorization"];
  const authToken = headers && headers.split(" ")[1];
  if (authToken === null) return res.sendStatus(401);

  jwt.verify(authToken, process.env.AUTH_TOKEN, (err, email) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.email = email;
    next();
  });
}
