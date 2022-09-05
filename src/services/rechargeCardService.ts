import * as companyRepository from '../repositories/companyRepository';
import * as cardUtils from '../utils/cardUtils';
import * as employeeRepository from '../repositories/employeeRepository';
import * as employeeUtils from '../utils/employeeUtils';
import * as rechargeRepository from '../repositories/rechargeRepository';

export async function rechargeCardService(apiKey: string | string[], cardId: number, amount: number){

    const company = await companyRepository.findByApiKey(apiKey.toString());

    const card = await cardUtils.checkCardIsRegistered(cardId);

    const employee = await employeeRepository.findById(card.employeeId);

    employeeUtils.checkEmployeesIsFromCompany(company.id, employee.companyId);

    cardUtils.checkCardHasNotBeenActivated(card.password);

    cardUtils.checkCardHasNotExpired(card.expirationDate);

    const rechargeData = {
        cardId,
        amount
    };

    await rechargeRepository.insert(rechargeData);

    return;
}   