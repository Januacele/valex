import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import './../setup';

import * as cardRepository from '../repositories/cardRepository'
import * as employeeUtils from '../utils/employeeUtils'
import * as cardUtils from '../utils/cardUtils'
import * as employeeRepository from '../repositories/employeeRepository'
import * as companyService from '../services/companyService';
import errorResponses from "../Responses/errorResponses";


export async function createCardService(apiKey: string, employeeId: number, type: cardRepository.TransactionTypes){

    await companyService.validateApiKey(apiKey); 

    const employee: any = await employeeUtils.checkEmployeesIsResistered(employeeId);
    const existingCard = await cardUtils.checkDoesNotHaveCardType(type, employeeId);
    if(existingCard){
        return errorResponses.conflict("Card already exist");
    }

    const number: string = await generateCardNumber('####-####-####-####');
    const cardholderName: string = await generateCardHolderName(employeeId);
    const securityCode: string = generateSecurityCode();
    const expirationDate: string = generateExpirationDate();


    const cardData: cardRepository.CardInsertData = {
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: false,
        type
    };

    await cardRepository.insert(cardData);
}

async function generateCardNumber(format: string): Promise<string> {
    let cardNumber: string = faker.finance.creditCardNumber(format);
    let cardWithThisNumber = await cardRepository.findByNumber(cardNumber);

    while (cardWithThisNumber) {
        cardNumber = faker.finance.creditCardNumber();
        cardWithThisNumber = await cardRepository.findByNumber(cardNumber);
    }
    return cardNumber;
}

   
async function generateCardHolderName(employeeId: number): Promise<string> {
    const { fullName } = await employeeRepository.findById(employeeId);
    let temp = fullName.toUpperCase().split(' ');

    const initialName = temp[0];
    const lastName = temp[temp.length - 1];

    let middleNames = temp.filter((name, index) => {
        return (
            name.length >= 3 &&
            index !== 0 &&
            index !== temp.length - 1
        )
    });
    middleNames = middleNames.map(name => {
        return name[0];
    });
    const shortMiddleNames = middleNames.join(' ');
    return initialName + ' ' + shortMiddleNames + ' ' + lastName;
}


function generateSecurityCode(): string {
    const securityCode = faker.finance.creditCardCVV();
    const cryptr = new Cryptr(process.env.CRYPT_KEY!);
    const hashedSecurityCode = cryptr.encrypt(securityCode);
    return hashedSecurityCode;
}


function generateExpirationDate(): string {

    const monthNow: string = (dayjs().month()).toString().padStart(2, '0');
    const yearNow: number = (dayjs().year());
    const expirationYear: string = (yearNow + 5).toString().slice(2);
    return monthNow + '/' + expirationYear;
}
 
