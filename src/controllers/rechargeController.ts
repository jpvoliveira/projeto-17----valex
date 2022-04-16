import { Request, Response } from "express";
import * as rechargeService from "../services/rechargeService.js";
import * as companyRepository from "../repositories/companyRepository.js";

export async function rechargeCard(req: Request, res: Response) {
  const apiKey = req.headers["x-api-key"] as string
  const {cardId, amount} = req.body

  const company = await companyRepository.findByApiKey(apiKey);
  if (!company)
    throw { type: "Conflict", message: "The key is from no company" };

  if (amount <= 0) 
    throw {type: "Conflict", message:"The value must be greater than 0"}

  await rechargeService.rechargeCard(cardId, amount)

  res.sendStatus(201)
}