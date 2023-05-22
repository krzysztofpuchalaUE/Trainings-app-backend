import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
import { router as allTrainingsRouter } from "./routes/trainings.js";
import { router as authRoutes } from "./routes/auth.js";

const trainingsRouter = allTrainingsRouter;
const authRouter = authRoutes;

app.use(trainingsRouter);
app.use(authRouter);
const PORT = process.env.PORT;

app.listen(PORT || 8800);
