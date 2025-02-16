import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import joyasRoute from "./routes/joyas.route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/joyas", joyasRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log("Servidor levantado con éxito! --> http://localhost:3000/"),
);
