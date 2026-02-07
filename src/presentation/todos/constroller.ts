import { Request, Response } from "express";

export class TodosController {
  constructor() {}

  public getTodos = (_: Request, res: Response) => {
    res.json([
      { id: 1, text: "Buy milk", createdAt: new Date() },
      { id: 2, text: "Buy breed", createdAt: null },
      { id: 3, text: "Buy butter", createdAt: new Date() },
    ]);
  };
}
