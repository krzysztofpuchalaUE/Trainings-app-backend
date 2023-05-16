import express from "express";
import cors from "cors";

import { router as allTrainingsRouter } from "./routes/trainings.js";
import { router as authRoutes } from "./routes/auth.js";

export const app = express();
app.use(cors());
app.use(express.json());
const trainingsRouter = allTrainingsRouter;
const authRouter = authRoutes;

app.use(trainingsRouter);
app.use(authRouter);
app.listen(8800);
