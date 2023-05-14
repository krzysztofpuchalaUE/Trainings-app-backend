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
