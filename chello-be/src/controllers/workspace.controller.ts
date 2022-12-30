import { Request, Response } from "express";

const index = (req: Request, res: Response) => {
  res.send("workspace index");
};

export { index };
