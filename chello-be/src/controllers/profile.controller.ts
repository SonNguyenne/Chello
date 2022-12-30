import { Request, Response } from "express";

const index = (req: Request, res: Response) => {
  res.send("profike index");
};

export { index };
