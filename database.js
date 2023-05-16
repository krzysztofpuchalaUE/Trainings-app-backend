import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

export const connectionPool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export const getAllTrainings = async () => {
  const [result] = await connectionPool.query("SELECT * FROM Trainings");
  return result;
};

export const registerOnTraining = async (trainingId, trainerId) => {
  const [result] = await connectionPool.query(
    `INSERT INTO User_trainings (trainer_id, training_id) VALUES (?,?)`,
    [trainerId, trainingId]
  );
  return result;
};

export const unregisterFromTraining = async (trainingId) => {
  const [result] = await connectionPool.query(
    "DELETE FROM User_trainings WHERE User_trainings.training_id = ?",
    [trainingId]
  );
  return result;
};

export const getIsRegistered = async () => {
  const [result] = await connectionPool.query(
    "SELECT training_id FROM User_trainings INNER JOIN Trainings ON User_trainings.training_id = Trainings.id AND User_trainings.trainer_id = Trainings.trainer_id WHERE User_trainings.training_id = Trainings.id"
  );
  return result;
};

export const getAllUserTrainings = async () => {
  const [result] = await connectionPool.query(
    "SELECT Trainings.id, Trainings.training_title, Trainings.training_start_date, Trainings.training_end_date, Trainings.training_start_time, Trainings.training_end_time, Trainings.training_language, Trainings.training_description,Trainings.training_level, Trainings.training_category,Trainings.training_location,Trainings.trainer_id,Trainings.training_icon FROM Trainings INNER JOIN User_trainings ON Trainings.trainer_id = User_trainings.trainer_id AND Trainings.id = User_trainings.training_id"
  );
  return result;
};

export const getAllTrainingsByCategory = async (category) => {
  const [result] = await connectionPool.query(
    "SELECT trainig FROM Trainings WHERE category = ?",
    [category]
  );
  return result;
};

export const getTrainingByID = async (id) => {
  const [result] = await connectionPool.query(
    "SELECT * FROM Trainings WHERE id = ?",
    [id]
  );
  return result[0];
};

export const createTraining = async (
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
  trainer_id,
  iconUrl
) => {
  const [result] = await connectionPool.query(
    `INSERT INTO Trainings (
    training_title,
    training_start_date,
    training_end_date,
    training_start_time,
    training_end_time,
    training_language,
    training_description,
    training_level,
    training_category,
    training_location,
    trainer_id,
    training_icon) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
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
      trainer_id,
      iconUrl,
    ]
  );
  return result;
};

export const updateTraining = async (
  id,
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
  trainer_id,
  iconUrl
) => {
  const [result] = await connectionPool.query(
    `UPDATE Trainings SET training_title = ?, training_start_date = ?, training_end_date = ?, training_start_time = ?, training_end_time = ?, training_language = ?, training_description = ?,training_level = ?, training_category = ?,training_location = ?,trainer_id = ?,training_icon = '?'
    WHERE id = ?`,
    [
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
      trainer_id,
      iconUrl,
      id,
    ]
  );
  return result;
};

export const deleteCustomTraining = async (id) => {
  const [result] = await connectionPool.query(
    "DELETE User_trainings, Trainings FROM User_trainings INNER JOIN Trainings ON User_trainings.training_id = Trainings.id AND User_trainings.trainer_id = Trainings.trainer_id WHERE Trainings.id = ?",
    [id]
  );
  return result;
};
