import UserT from "../../interfaces/User";
import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user:UserT
        }
    }
}

