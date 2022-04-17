import * as cardRepository from "../repositories/cardRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

export async function rechargeCard(cardId: number, amount: number) {
  const cardData = await cardRepository.findById(cardId)
  if (!cardData)
    throw { type: "Not Found", message: "Card does not exist" }

  const rechargeData = { cardId, amount }
  await rechargeRepository.insert(rechargeData)
}