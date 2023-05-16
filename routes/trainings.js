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

router.post("/user-trainings/new-training", async (req, res) => {
  const {
    title,
    category,
    startDate,
    endDate,
    startTime,
    endTime,
    language,
    location,
    description,
    level,
    trainerId,
    iconUrl,
  } = req.body.data;
  console.log(req.body.data);
  const training = await queries.createTraining(
    title,
    category,
    startDate,
    endDate,
    startTime,
    endTime,
    language,
    location,
    description,
    level,
    trainerId,
    iconUrl
  );
  res.send(training);
});

router
  .route("/user-trainings/:trainingId/edit")
  .patch(async (req, res) => {
    const { trainingId, data } = req.body;
    const {
      title,
      category,
      startDate,
      endDate,
      startTime,
      endTime,
      language,
      location,
      description,
      level,
      trainerId,
      iconUrl,
    } = data;
    const updatedTraining = await queries.updateTraining(
      trainingId,
      title,
      startDate,
      endDate,
      startTime,
      endTime,
      language,
      description,
      level,
      category,
      location,
      trainerId,
      iconUrl
    );
    return res.send(updatedTraining);
  })
  .get(async (req, res) => {
    const id = req.params.trainingId;
    const training = await queries.getTrainingByID(id);
    res.send(training);
  });

router.route("/user-trainings/:trainingId/delete").delete(async (req, res) => {
  console.log("active");
  const { trainingId } = req.body;
  const deleteCustomTraining = await queries.deleteCustomTraining(trainingId);
  return res.send(deleteCustomTraining);
});
