//import { Log } from "../mongo";
import { Request, NextFunction, Response } from "express";
import { getUser } from "./auth";
import { Log } from "../mongo";

const logger = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "POST") {
    const user = await getUser(req, res);
    if (user) {
      const log = new Log({
        message: `Request  ${req.method} ${req.url}`,
        userId: `${user.id}`,
      });
      await log.save();
    }
  }

  next();
};

export default logger;
