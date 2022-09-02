import { faker } from "@faker-js/faker";

import * as cardRepository from '../repositories/cardRepository'
import * as employeeUtils from '../utils/employeeUtils'
import * as cardUtils from '../utils/cardUtils'

export async function createCardService(companyId: number, employeeId: number, type: cardRepository.TransactionTypes){

    employeeUtils.checkEmployeesIsResistered(employeeId);
    employeeUtils.checkEmployeesIsFromCompany(companyId, employeeId);
    cardUtils.checkDoesNotHaveCardType(employeeId, type);


}


async function generateCardNUmber(format: string){
    let cardNumber: string = faker.finance.creditCardNumber(format);
    let cardWithThisNumber = await cardRepository.findByNumber(cardNumber);

    while (cardWithThisNumber) {
        cardNumber = faker.finance.creditCardNumber();
        cardWithThisNumber = await cardRepository.findByNumber(cardNumber);
    }
    return cardNumber;
}

