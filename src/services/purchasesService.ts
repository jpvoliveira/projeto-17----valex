import * as cardRepository from "../repositories/cardRepository.js"
import * as businessRepository from "../repositories/businessRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"


export async function purchases(cardId: number, password: string, businessId: number, amount: number) {
  const cardExisting = await cardRepository.findById(cardId)
  if (!cardExisting)
    throw { type: "Conflict", message: "Card does not exist" };

  if (cardExisting.password !== password)
    throw { type: "Conflict", message: "Incorrect password" };

  const businessExisting = await businessRepository.findById(businessId)
  if (!businessExisting)
    throw { type: "Conflict", message: "The business does not exist" }

  if (businessExisting.type !== cardExisting.type)
    throw { type: "Conflict", message: "The type of business is different from the type of card" }

  const paymentData = await paymentRepository.findByCardId(cardId)
  let contPayment = 0
  if (paymentData) {
    for (let i = 0; i < paymentData.length; i++) {
      const element = paymentData[i];
      contPayment = element.amount + contPayment
    }
  }

  const rechargeData = await rechargeRepository.findByCardId(cardId)
  let contRecharge = 0
  if (rechargeData) {
    for (let i = 0; i < rechargeData.length; i++) {
      const element = rechargeData[i];
      contRecharge = element.amount + contRecharge
    }
  }

  let balance = contRecharge - contPayment
  if (balance < amount)
    throw { type: "Conflict", message: "Insufficient funds" }

  const paymentInsertData = { cardId, businessId, amount }
  await paymentRepository.insert(paymentInsertData)
}