import { Request, Response } from "express";

export abstract class Controller<T> {
  protected service: T;

  constructor(service: T) {
    this.service = service;
  }

  abstract handle(req: Request, res: Response): Promise<void>;
}
