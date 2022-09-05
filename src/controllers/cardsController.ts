import { Request, Response } from "express";
import * as cardRepository from '../repositories/cardRepository';
import { activateCardService } from "../services/activateCardService";
import { createCardService } from "../services/cardService";
import { getCardTransactionsService } from "../services/getCardTransactionService";
import { blockCardService } from '../services/blockCardService';

export async function createCard(req: Request, res: Response){
    const apiKey:any = req.headers['x-api-key'];
    console.log(apiKey);
    const { employeeId, type } : { employeeId: number, type: cardRepository.TransactionTypes } = req.body;
    console.log(req.body);
    await createCardService(apiKey, employeeId, type);
    console.log("cartão criado")
    res.status(200).send("Card created.");
}


export async function activateCard(req: Request, res: Response){
    const { id, securityCode, password } : 
    { id: number, securityCode: string, password: string } = res.locals.body;

    await activateCardService(id, securityCode, password);

    res.status(200).send("Card activated.");
}


export async function getCardTransactions(req: Request, res: Response){
    const { number, cardholderName, expirationDate } : { number: string, cardholderName: string, expirationDate: string } = res.locals.body;
    
    const cardTransactions = await getCardTransactionsService(number, cardholderName, expirationDate);

    res.status(200).send(cardTransactions);
}


export async function blockCard(req: Request, res: Response){
    const { id, password } : { id: number, password: string } = res.locals.body;

    await blockCardService(id, password);

    res.status(200).send("Card blocked.");
}