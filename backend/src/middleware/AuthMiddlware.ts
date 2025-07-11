import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import UserT from "../interfaces/User";
import jwt from "jsonwebtoken";
config();


const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
 
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json({ error: "No authorization header provided" });
    return;
  }

  const token = authHeader.split(" ")[1];
console.log("received token", token);
  if (!token) {
    res.status(401).json({ error: "Token missing" });
    return;
  }

  try {
    const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN;
    console.log("ACCESS_TOKEN_SECRET", ACCESS_TOKEN_SECRET);
    if (!ACCESS_TOKEN_SECRET) {
      res.status(403).json({ message: "ACCESS_TOKEN_SECRET not found !!" });
      return;
    }
    const decoded = await jwt.verify(token, ACCESS_TOKEN_SECRET);

    const { user } = decoded as { user: UserT };

    req.user = user;
    console.log("authenticated ....");
    next();
  } catch (error) {
    console.log("error came ", error);
    res.sendStatus(403);
    return;
  }
};

export default AuthMiddleware;

