import express from "express";
import cors from "cors";
import pingRouter from "./routes/pingRouter";
import patientRouter from "./routes/patientRouter";
import diagnoseRouter from "./routes/diagnosisRouter";


const PORT = 3000;

const corsOptions = {
  origin: 'http://localhost:3001'
};

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/ping", pingRouter);
app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
