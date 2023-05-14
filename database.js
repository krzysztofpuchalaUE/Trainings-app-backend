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
    `INSERT INTO User_trainings (
    trainer_id,
    training_id,
  ) VALUES (?,?)`,
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
