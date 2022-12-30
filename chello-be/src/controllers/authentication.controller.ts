import { Request, Response } from "express";

const index = (req: Request, res: Response) => {
  res.send("authen index");
};

export { index };
