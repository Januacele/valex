import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import './../setup';

import * as cardRepository from '../repositories/cardRepository'
import * as employeeUtils from '../utils/employeeUtils'
import * as cardUtils from '../utils/cardUtils'
import * as employeeRepository from '../repositories/employeeRepository'



export async function createCardService(companyId: number, employeeId: number, type: cardRepository.TransactionTypes){

    employeeUtils.checkEmployeesIsResistered(employeeId);
    employeeUtils.checkEmployeesIsFromCompany(companyId, employeeId);
    cardUtils.checkDoesNotHaveCardType(employeeId, type);
    
    const number: string = await generateCardNUmber('####-####-####-####');
    const cardholderName = await generateCardHolderName(employeeId);
    const securityCode: any = generateSecurityCode();

    const expirationDate: any = generateExpirationDate();

    const cardData: cardRepository.CardInsertData = {
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password: null,
        isVirtual:false,
        originalCardId: null,
        isBlocked: false,
        type,
    }
    await cardRepository.insert(cardData);
}


async function generateCardNUmber(format: string){
    let cardNumber = faker.finance.creditCardNumber(format);
    let cardWithThisNumber = await cardRepository.findByNumber(cardNumber);

    while (cardWithThisNumber) {
        cardNumber = faker.finance.creditCardNumber();
        cardWithThisNumber = await cardRepository.findByNumber(cardNumber);
    }
    return cardNumber;
}

async function generateCardHolderName(employeeId: number){
    const { fullName } = await employeeRepository.findById(employeeId);
    let nameUpper = fullName.toUpperCase().split(' ');

    const initialName = nameUpper[0];
    const lastName = nameUpper[nameUpper.length - 1];

    let middleName = nameUpper.filter((name, index) => {
        return(
            name.length >= 3 &&
            index !== 0 &&
            index !== nameUpper.length - 1
        )
    });

    middleName = middleName.map(name => {
        return name[0];
    });

    const shortMiddleName = middleName.join(' ');

    return initialName + ' ' + shortMiddleName + ' ' + lastName;
}

async function generateSecurityCode(){
    const securityCode = faker.finance.creditCardCVV();
    const cryptr: any = new Cryptr(process.env.CRYPT_KEY!) ?? '';
    const hashedSecurityCode = cryptr.encrypt(securityCode);
    return hashedSecurityCode;
}

async function generateExpirationDate(){
    const monthCreatedCard = (dayjs().month()).toString().padStart(2, '0');
    const yearNow = (dayjs().year());

    const expirationYear = (yearNow + 5).toString().slice(2);

    return monthCreatedCard + '/' + expirationYear;
}