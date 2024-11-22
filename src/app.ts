import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(cors({
  origin: "*",
}));

app.get("/", (req, res) => {
  res.json({ message: "We got your request" });
});

app.use("/api/v1", router);

app.use((req, res) => {
  res.status(404).json({ err: "Endpoint not found" });
});

export default app;
