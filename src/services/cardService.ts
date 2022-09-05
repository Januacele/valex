import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import './../setup';

import * as cardRepository from '../repositories/cardRepository';
import * as employeeUtils from '../utils/employeeUtils';
import * as companyService from '../services/companyService';
import errorResponses from "../Responses/errorResponses";

const CARD_FLAG = "mastercard";
const EXPIRATION_IN_YEARS = 5;
const DATE_CARD_FORMAT = "MM/YY";

export async function createCardService(apiKey: string, employeeId: number, type: cardRepository.TransactionTypes){
    await companyService.validateApiKey(apiKey); 
    
    const employee:any = await employeeUtils.checkEmployeesIsResistered(employeeId);

    const existingCard = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    if(existingCard){
        return errorResponses.conflict("Card already exist");
    }

    const cardData = generateCardData(employee.fullName);
    await cardRepository.insert({
        ...cardData,
        employeeId,
        isVirtual: false,
        isBlocked: false,
        type
    });
}

function generateCardData(employeeName: string) {
    return {
      number: faker.finance.creditCardNumber(CARD_FLAG),
      cardholderName: generateCardHolderName(employeeName),
      securityCode: generateSecurityCode(),
      expirationDate: generateExpirationDate(EXPIRATION_IN_YEARS, DATE_CARD_FORMAT)
    };
  }


function generateCardHolderName(fullName: string){
    const [firstName, ...otherNames] = fullName.split(" ");
    const lastName = otherNames.pop();
    const middleNames = otherNames.filter(filterTwoLetterMiddleName).map(getMiddleNameInitial);

    if (middleNames.length > 0) {
        return [firstName, middleNames, lastName].join(" ").toUpperCase();
      }
    
      return [firstName, lastName].join(" ").toUpperCase();
}

function getMiddleNameInitial(middleName: string) {
    return middleName[0];
}
  
function filterTwoLetterMiddleName(middleName: string) {
    if (middleName.length >= 3) return middleName;
}


function generateSecurityCode(): string {
    const securityCode = faker.finance.creditCardCVV();
    const cryptr = new Cryptr(process.env.CRYPT_KEY!);
    const hashedSecurityCode = cryptr.encrypt(securityCode);
    return hashedSecurityCode;
}


function generateExpirationDate(years: number, format: string) {
    return dayjs().add(years, "year").format(format);
}
 
