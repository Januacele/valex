import * as cardUtil from "../utils/cardUtils";
import * as businessRepository from '../repositories/businessRepository';
import errorResponses from "../Responses/errorResponses";
import * as paymentRepository from '../repositories/paymentRepository';

export async function payment(cardId: number, password: string, businessId: number, amount: number ){
    const card = await cardUtil.checkCardIsRegistered(cardId);

    cardUtil.checkCardHasNotBeenActivated(card.password);
    cardUtil.checkCardHasNotExpired(card.expirationDate);
    cardUtil.checkCardBlockedStatus(card.isBlocked, false);
    cardUtil.checkPassword(card.password, password);

    const business = await checkBusinessIsRegistered(businessId);

    checkTypeOfBusiness(business.type, card.type);
    checkBalanceCoversPayment(card.id, amount);

    const paymentData = {
        cardId,
        businessId,
        amount
    };

    await paymentRepository.insert(paymentData);
}


async function checkBusinessIsRegistered(businessId: number){
    const business = businessRepository.findById(businessId);
    if (!business) {
        return errorResponses.notFound("Business");
    }

    return business;
}

function checkTypeOfBusiness(businessType: string, cardType: string){
    if (businessType !== cardType){
        return errorResponses.unprocessableEntity("business and/or card type");
    }

    return;
}

async function checkBalanceCoversPayment(cardId: number, amount: number){
    const { balance } = await cardUtil.getTransactionsData(cardId);

    if (balance < amount){
        return errorResponses.unprocessableEntity("card balance");
    }

    return;
}