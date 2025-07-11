import { z } from "zod";

export const LoginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});

export const RegisterSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
});

export const PaperSchema = z.object({
    title: z.string(),
    course: z.array(z.string()),
    semester: z.string(),
    subject: z.string(),
    year: z.string(),
    fileUrl: z.string().optional(),
});

