import * as queries from "../database.js";
import express from "express";

export const router = express.Router();

router
  .route("/trainings")
  .get(async (req, res) => {
    const trainings = await queries.getAllTrainings();
    const isRegistered = await queries.getIsRegistered();
    return res.json({ trainings, isRegistered });
  })
  .post(async (req, res) => {
    const { trainingId, trainerId } = req.body;
    const addTraining = await queries.registerOnTraining(trainingId, trainerId);
    res.send(addTraining);
  })
  .delete(async (req, res) => {
    const { trainingId } = req.body;
    const deleteTraining = await queries.unregisterFromTraining(trainingId);
    res.send(deleteTraining);
  });

router.route("/user-trainings").get(async (req, res) => {
  const myTrainings = await queries.getAllUserTrainings();
  res.json(myTrainings);
});
