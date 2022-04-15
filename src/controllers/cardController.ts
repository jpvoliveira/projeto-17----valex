import { Request, Response } from "express";
import * as cardService from "../services/cardService.js";

export async function cardCreate(req: Request, res: Response) {
  const apiKey = req.headers["x-api-key"] as string;
  const {
    employeeId,
    type,
  } = req.body;

  await cardService.validateCardService(
    apiKey,
    employeeId,
    type
  );

  res.sendStatus(201);
}
