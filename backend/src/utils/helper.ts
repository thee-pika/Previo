import jwt from "jsonwebtoken";
import UserT from "../interfaces/User";
import { config } from "dotenv";
config();

export const GenerateTokens = async (user: UserT): Promise<{
    access_Token: string;
    refresh_Token: string;
}> => {
    
    const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN;
    const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;

    if (!JWT_ACCESS_TOKEN || !JWT_REFRESH_TOKEN) {
        console.log("secrets not found!!!", JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN);
        return { access_Token: "", refresh_Token: "" };
    }
    console.log("JWT_ACCESS_TOKENJWT_ACCESS_TOKENJWT_ACCESS_TOKENJWT_ACCESS_TOKENJWT_ACCESS_TOKEN", JWT_ACCESS_TOKEN);
    console.log("JWT_REFRESH_TOKENJWT_REFRESNJWT_REFRESH_TOKENJWT_REFRESH_TOKENJWT_REFRESH_TOKEN", JWT_REFRESH_TOKEN);

    const access_Token = await jwt.sign({ user }, JWT_ACCESS_TOKEN, {
        expiresIn: "24h",
    });
    
    console.log("access_Token", access_Token);
    const refresh_Token = await jwt.sign({ user }, JWT_REFRESH_TOKEN, {
        expiresIn: "7d",
    });

    return { access_Token, refresh_Token };
};


