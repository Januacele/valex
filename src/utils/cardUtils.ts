import * as cardRepository from '../repositories/cardRepository'
import errorResponses from '../Responses/errorResponses';

export async function checkDoesNotHaveCardType(type: cardRepository.TransactionTypes, employeeId: number): Promise<any>{
    const cardOfThisType = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    if(cardOfThisType){
        return errorResponses.conflict("Employeed already have this card type")
    }
}