import * as cardUtils from '../utils/cardUtils';
import * as cardRepository from '../repositories/cardRepository';

export async function blockCardService(id: number, password: string){
    const card = await cardUtils.checkCardIsRegistered(id);

    cardUtils.checkCardHasNotExpired(card.expirationDate);

    const blockedStatusToCheck = false;
    cardUtils.checkCardBlockedStatus(card.isBlocked, blockedStatusToCheck);

    cardUtils.checkPassword(card.password, password);

    await cardRepository.update(id, { isBlocked: true });
}