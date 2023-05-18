import * as queries from "../database.js";
import express from "express";
import { authenticateToken } from "../utils/authToken.js";
import * as validation from "../validation/validation.js";

export const router = express.Router();

router
  .route("/trainings")
  .get(authenticateToken, async (req, res) => {
    const email = req.email.email;
    const trainings = await queries.getAllTrainings();
    const isRegistered = await queries.getIsRegistered(email);
    const allCategories = await queries.getAllCategories();
    return res.json({ trainings, isRegistered, allCategories });
  })
  .post(authenticateToken, async (req, res) => {
    const { trainingId, trainerId } = req.body;
    const email = req.email.email;
    const addTraining = await queries.registerOnTraining(
      trainingId,
      trainerId,
      email
    );
    res.send(addTraining);
  })
  .delete(authenticateToken, async (req, res) => {
    const { trainingId } = req.body;
    const email = req.email.email;
    const deleteTraining = await queries.unregisterFromTraining(
      trainingId,
      email
    );
    res.send(deleteTraining);
  });

router.route("/user-trainings").get(authenticateToken, async (req, res) => {
  const email = req.email.email;
  const myTrainings = await queries.getAllUserTrainings(email);
  const userId = await queries.getUserByEmail(email);
  res.json({ myTrainings, userId });
});

router.get("/trainings/:category", async (req, res) => {
  try {
    const id = req.params.id;
    const training = await queries.getTrainingByID(id);
    res.json({ training });
  } catch {
    res.status(500).json("");
  }
});

router.post(
  "/user-trainings/new-training",
  authenticateToken,
  async (req, res) => {
    const email = req.email.email;
    const trainerData = await queries.getUserByEmail(email);
    const { user_first_name, user_last_name, id: trainerId } = trainerData[0];

    let errors = {};
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
      iconUrl,
    } = req.body.data;

    if (!validation.isTitleValid(title)) errors.title = "Invalid title";

    if (!validation.isCategoryValid(category))
      errors.category = "Invalid category";

    if (!validation.isStartDateValid(startDate, endDate))
      errors.startDate = "Ivalid start date";

    if (!validation.isEndDateValid(endDate, startDate))
      errors.endDate = "Invalid end date";

    if (!validation.isStartTimeValid(startTime))
      errors.startTime = "Invalid start time";

    if (!validation.isEndTimeValid(endTime))
      errors.endTime = "Invalid end time";

    if (!validation.isLanguageValid(language))
      errors.language = "Invalid language";

    if (!validation.isLocationValid(location))
      errors.location = "Invalid location";

    if (!validation.isLevelValid(level)) errors.level = "Invalid level";

    if (!validation.isDescriptionValid(description))
      errors.description = "Invalid description";

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        message: "Create training failed due to validation errors",
        errors,
      });
    }

    try {
      await queries.createTraining(
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
        user_first_name.concat(" ", user_last_name),
        trainerId,
        iconUrl
      );
      const trainingDbId = await queries.getTrainingByProperties(
        title,
        category,
        trainerId
      );
      await queries.registerOnTraining(trainingDbId[0].id, trainerId, email);
      res.json({ message: "successfully created training" });
    } catch {
      res.status(500).json({ message: "create training failed" });
    }
  }
);

router
  .route("/user-trainings/:trainingId/edit")
  .patch(authenticateToken, async (req, res) => {
    const email = req.email.email;
    const trainerData = await queries.getUserByEmail(email);
    const { user_first_name, user_last_name, id: trainerId } = trainerData[0];
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
      iconUrl,
    } = data;

    let errors = {};

    if (!validation.isTitleValid(title)) errors.title = "Invalid title";

    if (!validation.isCategoryValid(category))
      errors.category = "Invalid category";

    if (!validation.isStartDateValid(startDate, endDate))
      errors.startDate = "Ivalid start date";

    if (!validation.isEndDateValid(endDate, startDate))
      errors.endDate = "Invalid end date";

    if (!validation.isStartTimeValid(startTime))
      errors.startTime = "Invalid start time";

    if (!validation.isEndTimeValid(endTime))
      errors.endTime = "Invalid end time";

    if (!validation.isLanguageValid(language))
      errors.language = "Invalid language";

    if (!validation.isLocationValid(location))
      errors.location = "Invalid location";

    if (!validation.isLevelValid(level)) errors.level = "Invalid level";

    if (!validation.isDescriptionValid(description))
      errors.description = "Invalid description";

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        message: "Create training failed due to validation errors",
        errors,
      });
    }

    try {
      await queries.updateTraining(
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
        user_first_name.concat(" ", user_last_name),
        trainerId,
        iconUrl
      );
      res.json({ message: "successfully updated training" });
    } catch {
      res.status(500).json({ message: "update training failed" });
    }
  })
  .get(authenticateToken, async (req, res) => {
    try {
      const id = req.params.trainingId;
      const training = await queries.getTrainingByID(id);
      res.json({ training });
    } catch (err) {
      res
        .status(500)
        .json({ message: err ? `${err}` : "update training failed" });
    }
  });

router.route("/user-trainings/:trainingId/delete").delete(async (req, res) => {
  const { trainingId } = req.body;
  try {
    await queries.deleteCustomTraining(trainingId);
    return res.json({ message: "Deleted training succesfull" });
  } catch {
    res.status(500).json({ message: "Delete training failed" });
  }
});
