import cors from "cors";
import express from "express";
import { router as authRouter } from "./routes/auth";
import { router as userRouter } from "./routes/user";
import { router as qualificationRouter } from "./routes/qualification";
import { router as expertiseRouter } from "./routes/expertise";

// App
export const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing incoming data

// Test api routes
// app.get("/", (_, res) => res.send("hello world"));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/qualification", qualificationRouter);
app.use("/api/expertise", expertiseRouter);
