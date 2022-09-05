import bcrypt from "bcrypt";
import dayjs from "dayjs";
import "../setup";

import * as cardRepository from '../repositories/cardRepository';
import * as cardUtils from '../utils/cardUtils';
import errorResponses from "../Responses/errorResponses";

const DATE_CARD_FORMAT = "MM/YY";
const PASSWORD_FORMAT_4_DIGITS = /^[0-9]{4}$/;

export async function activateCardService(cardId: number, cvc: string, password: string){
    const card = await cardUtils.checkCardIsRegistered(cardId);
    validateExpirationDateOrFail(card.expirationDate);
    validateCVCOrFail(cvc, card.securityCode);

    const isAlreadyActive = card.password;
    if (isAlreadyActive) return errorResponses.badRequest("data");
    if (!PASSWORD_FORMAT_4_DIGITS.test(password)) return errorResponses.badRequest("invalid  data");

    const SALT = Number(process.env.SALT);
    const hashedPassword = bcrypt.hashSync(password, SALT);

    await cardRepository.update(cardId, {password: hashedPassword});
}


export function validateExpirationDateOrFail(expirationDate: string) {
    const today = dayjs().format(DATE_CARD_FORMAT);
    if (dayjs(today).isAfter(dayjs(expirationDate))) {
      return errorResponses.badRequest("Data");
    }
}

export function validateCVCOrFail(cvc: string, cardCVC: string) {
    const isCVCValid = bcrypt.compareSync(cvc, cardCVC);
    if (!isCVCValid) {
      return errorResponses.unauthorized("data")
    }
  }