import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Unauthorized } from "../../http-status";
import { User } from "../../../database/entity/User";

const secretkey = "secret-key-token";
const options: jwt.SignOptions = {
    expiresIn: "1h"
};

export const verify = (req: Request, res?: Response) => {
    console.log("verrii");
    try {
        const authorization = req.get("authorization");
        if (!authorization || authorization.length === 0) {
            // if (res) res.status(401);
            throw new Unauthorized();
        }
        const token = authorization.split(" ")[1];
        const payload: any = jwt.verify(token, secretkey);
        console.log(payload);
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp <= now) {
            // if (res) res.status(401);
            throw new Unauthorized("El token ha expirado");
        }

        return payload.user as Partial<User>;
    } catch (error) {
        // if (res) res.status(401);
        throw new Unauthorized(error.message);
    }
};

export const sign = (user: string | object | Buffer) => {
    return jwt.sign({ user }, secretkey, options);
};
