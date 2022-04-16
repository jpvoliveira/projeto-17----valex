import { Request, Response } from "express";
import * as purchasesService from "../services/purchasesService.js"

export async function purchases(req: Request, res: Response) {
  const { cardId, password, businessId, amount } = req.body
  if (amount <= 0)
    throw { type: "Conflict", message: "The purchase amount must be greater than 0" }

  await purchasesService.purchases(cardId, password, businessId, amount)
  
  res.sendStatus(201)
}