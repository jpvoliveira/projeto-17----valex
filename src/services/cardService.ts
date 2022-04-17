import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import faker from '@faker-js/faker'
import dayjs from 'dayjs'

export async function validateCardService(
  apiKey: string,
  employeeId: number,
  type
) {
  const company = await companyRepository.findByApiKey(apiKey);
  if (!company)
    throw { type: "Not Found", message: "This key does not exist" };

  const employee = await employeeRepository.findById(employeeId);
  if (!employee)
    throw { type: "Not Found", message: "This employee does not exist" };

  const typeCard = await cardRepository.findByTypeAndEmployeeId(type, employeeId)
  if (typeCard)
    throw { type: "Conflict", message: "The employee already has a card of this type" };

  if (type !== 'groceries' && type !== 'restaurants' && type !== 'transport' && type !== 'education' && type !== 'health')
    throw { type: "Not Found", message: "This type of card does not exist" };

  const flagNumber = faker.datatype.number({ min: 51, max: 55 })
  const finishNumber = faker.datatype.number({ min: 10000000000000, max: 99999999999999 })
  const number = `${flagNumber}${finishNumber}`

  const name = employee.fullName.toUpperCase().split(" ")
  const arrayName = []

  for (let i = 0; i < name.length; i++) {
    const element = name[i];
    if (i === 0 || i === name.length - 1) {
      arrayName.push(element)
    }
    if (element.length > 3 && i !== 0 && i !== name.length - 1) {
      arrayName.push(element[0])
    }
  }

  const cardholderName = arrayName.toString().replace(/,/g, " ")
  const today = dayjs().format('MM/YY').split("/")
  const expirationDate = today[0] + "/" + (parseInt(today[1]) + 5)
  const securityCode = faker.datatype.number({ min: 100, max: 999 }).toString()

  const cardData = {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password: undefined,
    isVirtual: false,
    originalCardId: null,
    isBlocked: false,
    type
  }

  await cardRepository.insert(cardData)
}

export async function cardActive(cardId: number, cvc: string, password: string) {
  const existingCard = await cardRepository.findById(cardId)
  if (!existingCard)
    throw { type: "Not Found", message: "Card does not exist" };

  if (existingCard.securityCode !== cvc)
    throw { type: "Conflict", message: "Card data does not match" };

  if (existingCard.password)
    throw { type: "Conflict", message: "Card already active" };

  if (password.length !== 4)
    throw { type: "Unprocessable Entity", message: "Password must be 4 digits" };

  existingCard.password = password
  await cardRepository.update(cardId, existingCard)
}

export async function cardView(cardId: number) {
  const existingCard = await cardRepository.findById(cardId)
  if (!existingCard)
    throw { type: "Not Found", message: "Card does not exist" };

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
  const cardViewData = { balance, transactions: paymentData, recharge: rechargeData }
  return cardViewData
}