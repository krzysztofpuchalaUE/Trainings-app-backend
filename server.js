import express from "express";
import cors from "cors";

import { router as allTrainingsRouter } from "./routes/trainings.js";

export const app = express();
app.use(cors());
app.use(express.json());
const trainingsRouter = allTrainingsRouter;

app.use(trainingsRouter);

app.listen(8800);
