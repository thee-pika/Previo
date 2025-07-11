import express, { Request, Response } from "express";
import { LoginSchema, RegisterSchema } from "../types";
import User from "../models/user";
import bcrypt from "bcrypt";
import { GenerateTokens } from "../utils/helper";
import UserT from "../interfaces/User";

export const authRouter = express();

const login = async (req: Request, res: Response) => {
    try {
        const parsedData = await LoginSchema.safeParse(req.body);

        if (!parsedData.success) {
            res.status(400).json({ message: "validation Failed!!" });
            return;
        }

        const userExists = await User.findOne({
            email: parsedData.data.email,
        });

        if (!userExists) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const hashedPassword = await bcrypt.compare(
            parsedData.data.password,
            userExists.password
        );

        if (!hashedPassword) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const userObject: UserT = {
            _id: userExists._id.toString(),
            name: userExists.name,
            email: userExists.email,
            role: userExists.role
        };

        const existingRefreshToken = userExists.refresh_token;

        const { access_Token, refresh_Token } = await GenerateTokens(userObject);

        if (!existingRefreshToken) {
            await User.findByIdAndUpdate(userExists._id, {
                refresh_token: refresh_Token
            });
        }

        res.json({
            success: true,
            access_Token,
            refresh_Token: existingRefreshToken || refresh_Token,
            user: userExists
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "error occurd", error });
    }
}

const signup = async (req: Request, res: Response) => {
    try {
        const parsedData = await RegisterSchema.safeParse(req.body);

        if (!parsedData.success) {
            res
                .status(400)
                .json({ success: false, message: "validation Failed!!", error: parsedData.error });
            return;
        }

        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

        const user = await User.create({
            name: parsedData.data.name,
            email: parsedData.data.email,
            password: hashedPassword
        });

        res.json({ success: true, message: "user created successfully", userId: user.id });
    } catch (error) {
        res.status(500).json({ success: false, message: "error occurd", error });
    }
}

export { login, signup };


