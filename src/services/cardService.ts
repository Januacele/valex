

import * as cardRepository from '../repositories/cardRepository'
import * as employeeUtils from '../utils/employeeUtils'
import * as cardUtils from '../utils/cardUtils'

export async function createCardService(companyId: number, employeeId: number, type: cardRepository.TransactionTypes){

    employeeUtils.checkEmployeesIsResistered(employeeId);
    employeeUtils.checkEmployeesIsFromCompany(companyId, employeeId);
    cardUtils.checkDoesNotHaveCardType(employeeId, type);

}




