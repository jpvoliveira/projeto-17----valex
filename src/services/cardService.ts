import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import faker from '@faker-js/faker'
import dayjs from 'dayjs'

export async function validateCardService(
  apiKey: string,
  employeeId: number,
  type: cardRepository.TransactionTypes
) {
  const company = await companyRepository.findByApiKey(apiKey);
  if (!company)
    throw { type: "Conflict", message: "The key is from no company" };

  const employee = await employeeRepository.findById(employeeId);
  if (!employee)
    throw { type: "Conflict", message: "This employee does not exist" };

  const typeCard = await cardRepository.findByTypeAndEmployeeId(type, employeeId)
  if (typeCard)
    throw { type: "Conflict", message: "The employee already has a card of this type" };

  //if (type!=='groceries' && type!=='restaurants' && type!=='transport' && type!=='education' && type!=='health')
  // throw { type: "Conflict", message: "This type of card does not exist" };

  const flagNumber = faker.datatype.number({ min: 51, max: 55 })
  const finishNumber = faker.datatype.number({ min: 10000000000000, max: 99999999999999 })
  const number = `${flagNumber}${finishNumber}`
  console.log(number)

  const name = employee.fullName.toUpperCase().split(" ")
  const arrayName = []

  for (let i = 0; i < name.length; i++) {
    const element = name[i];
    if (i === 0 || i === name.length - 1) {
      arrayName.push(element)
    }
    if(element.length>3 && i !== 0 && i !== name.length - 1){
      arrayName.push(element[0])
    }
  }
  const cardholderName = arrayName.toString().replace(/,/g," ")
  console.log(cardholderName)

  const today = dayjs().format('MM/YY').split("/")
  const expirationDate = today[0] + "/" + (parseInt(today[1]) + 5)
  console.log(expirationDate)

  const securityCode = faker.datatype.number({ min: 100, max: 999 }).toString()
  console.log(securityCode)

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
