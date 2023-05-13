import * as queries from "../database.js";
import express from "express";

export const router = express.Router();

router.route("/trainings").get(async (req, res) => {
  const trainings = await queries.getAllTrainings();
  return res.json(trainings);
});
