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

export async function cardActive(req:Request, res:Response) {
  const {cardId, cvc, password} = req.body
  await cardService.cardActive(cardId, cvc, password)
  res.sendStatus(201)
}

export async function cardView(req:Request, res:Response) {
  const {cardId} = req.body
  const cardView = await cardService.cardView(cardId)
  res.send(cardView)
}

export async function cardBlock(req:Request, res:Response) {
  const {cardId, password} = req.body
  await cardService.cardBlock(cardId, password)
  res.sendStatus(201)
}

export async function cardUnlock(req:Request, res:Response) {
  const {cardId, password} = req.body
  await cardService.cardUnlock(cardId, password)
  res.sendStatus(201)
}
