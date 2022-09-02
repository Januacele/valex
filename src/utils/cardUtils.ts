import * as cardRepository from '../repositories/cardRepository'


export async function checkDoesNotHaveCardType(employeeId: number, type: cardRepository.TransactionTypes): Promise<any>{
    const cardOfThisType = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    if(cardOfThisType){
        throw {
            type: "error_conflict",
            message: "already registered." 
        }
    }
}