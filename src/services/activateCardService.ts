import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import "../setup";

import * as cardRepository from '../repositories/cardRepository';
import * as cardUtils from '../utils/cardUtils';
import errorResponses from "../Responses/errorResponses";

export async function activateCardService(id: number, securityCode: string, password: string){
    const card : cardRepository.Card = await cardUtils.checkCardIsRegistered(id);
    cardUtils.checkCardHasNotExpired(card.expirationDate);
    cardUtils.checkCardHasNotBeenActivated(card.password);

    await validateSecurityCode(card, securityCode);

    const SALT = Number(process.env.SALT);
    const hashedPassword = bcrypt.hashSync(password, SALT);
    await cardRepository.update(id, {password: hashedPassword});
}


async function validateSecurityCode(card: cardRepository.Card, securityCode : string){
    const cryptr = new Cryptr(process.env.CRYPT_KEY!);

    const hashedSecurityCode = cryptr.encrypt(securityCode);

    if (card.securityCode !== hashedSecurityCode){
        return errorResponses.unprocessableEntity("card security code");
    }

    return;
}