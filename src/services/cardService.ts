import { faker } from "@faker-js/faker";

import * as cardRepository from '../repositories/cardRepository'
import * as employeeUtils from '../utils/employeeUtils'
import * as cardUtils from '../utils/cardUtils'
import * as employeeRepository from '../repositories/employeeRepository'


export async function createCardService(companyId: number, employeeId: number, type: cardRepository.TransactionTypes){

    employeeUtils.checkEmployeesIsResistered(employeeId);
    employeeUtils.checkEmployeesIsFromCompany(companyId, employeeId);
    cardUtils.checkDoesNotHaveCardType(employeeId, type);
    const numberCard: string = await generateCardNUmber('####-####-####-####');
    const cardholderName: string = await generateCardHolderName(employeeId);


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