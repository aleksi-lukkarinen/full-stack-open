import express from "express";
import pingRouter from "./routes/pingRouter";
import diagnoseRouter from "./routes/diagnoseRouter";

const PORT = 3000;


const app = express();
app.use(express.json());
app.use("/api/ping", pingRouter);
app.use("/api/diagnoses", diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
