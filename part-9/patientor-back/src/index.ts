import express from "express";
import pingRouter from "./routes/ping";
import diagnoseRouter from "./routes/diagnoses";

const PORT = 3000;


const app = express();
app.use(express.json());
app.use("/api/ping", pingRouter);
app.use("/api/diagnoses", diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
