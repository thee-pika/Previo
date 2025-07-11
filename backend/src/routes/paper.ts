import express from "express";
import { createPaper, getPapers, getPaperById, deletePaper, updatePaper } from "../controllers/paper";
import AuthMiddleware from "../middleware/AuthMiddlware";
import multer from "multer";

export const paperRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

paperRouter.post("/", AuthMiddleware, upload.single("fileUrl"), createPaper);
paperRouter.get("/", getPapers);
paperRouter.get("/:id", AuthMiddleware, getPaperById);
paperRouter.delete("/:id", AuthMiddleware, deletePaper);
paperRouter.put("/:id", AuthMiddleware, updatePaper);

