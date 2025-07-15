import { Request, Response } from "express";
import { PaperSchema } from "../types";
import Paper from "../models/Paper";
import { uploadImageToCloudinary } from "../utils/imageUpload";

const createPaper = async (req: Request, res: Response) => {
    try {
        if(Buffer.isBuffer(req.body)){
            req.body = JSON.parse(req.body.toString("utf-8"));
        }else if(typeof req.body === "string"){
            req.body = JSON.parse(req.body);
        }

        const body = {
            ...req.body,
            course: JSON.parse(req.body.course),
        };
        const parsedData = await PaperSchema.safeParse(body);

        if (!parsedData.success) {
            res.status(400).json({ message: "All fields are required", error: parsedData.error });
            return;
        }

        if (!req.file) {
            res.status(400).json({
                error: "Avatar is required",
                details: parsedData.error,
            });
            return;
        }

        const result = await uploadImageToCloudinary(req.file.buffer);

        const { url, id } = JSON.parse(result);
        if (!result) {
            res.status(400).json({
                error: "Failed to upload image",
                details: parsedData.error,
            });
            return;
        }

        const paper = await Paper.create({ ...parsedData.data, fileUrl: url, fileId: id, year: parseInt(parsedData.data.year), semester: parseInt(parsedData.data.semester) });
        res.json({ success: true, message: "paper created successfully", paper });
    } catch (error) {
        res.status(500).json({ success: false, message: "error occured", error });
    }
}

const getPapers = async (req: Request, res: Response) => {
    try {
        const papers = await Paper.find();
        res.json({ success: true, papers });
    } catch (error) {
        res.status(500).json({ success: false, message: "error occured", error });
    }
}

const getPaperById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ success: false, message: "id is required" });
            return;
        }
        const paper = await Paper.findById(id);
        if (!paper) {
            res.status(404).json({ success: false, message: "paper not found" });
            return;
        }
        res.json({ success: true, paper });
    } catch (error) {
        res.status(500).json({ success: false, message: "error occured", error });
    }
}

const deletePaper = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ success: false, message: "id is required" });
            return;
        }
        const paper = await Paper.findById(id);
        if (!paper) {
            res.status(404).json({ success: false, message: "paper not found" });
            return;
        }
        await Paper.findByIdAndDelete(id);
        res.json({ success: true, message: "paper deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "error occured", error });
    }
}

const updatePaper = async (req: Request, res: Response) => {
    try {
        if(Buffer.isBuffer(req.body)){
            console.log("req.body is a buffer");
            req.body = JSON.parse(req.body.toString("utf-8"));
            console.log("req.body", req.body);
        }else if(typeof req.body === "string"){
            console.log("req.body is a string");
            req.body = JSON.parse(req.body);
            console.log("req.body", req.body);
        }
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ success: false, message: "id is required" });
            return;
        }
        const paper = await Paper.findById(id);
        if (!paper) {
            res.status(404).json({ success: false, message: "paper not found" });
            return;
        }
        const updatedPaper = await Paper.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ success: true, message: "paper updated successfully", updatedPaper });
    } catch (error) {
        res.status(500).json({ success: false, message: "error occured", error });
    }
}

export { createPaper, getPapers, getPaperById, deletePaper, updatePaper };

