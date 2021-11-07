import cors from "cors";
import express from "express";

// App
export const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing incoming data

// Test api routes
app.get("/", (_, res) => res.send("hello world"));
