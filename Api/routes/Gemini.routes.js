import express from "express";
import { askGemini } from "../controllers/gemini.controller.js";

const GeminiRoute = express.Router();

GeminiRoute.post("/gemini", askGemini);

export default GeminiRoute;
