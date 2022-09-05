import * as cardRepository from '../repositories/cardRepository';
import * as cardUtils from '../utils/cardUtils';
import errorResponses from '../Responses/errorResponses';


export async function getCardTransactionsService( number: string, cardholderName: string, expirationDate: string ){

    const card = await cardRepository.findByCardDetails(number, cardholderName, expirationDate);
    if (!card) {
        return errorResponses.notFound("Card");
    };

    const transactions = await cardUtils.getTransactionsData(card.id);

    return transactions;
}