import { Request, Response } from "express";
import { activateCardService } from "../services/activateCardService";
import { createCardService } from "../services/cardService";
import { getCardTransactionsService } from "../services/getCardTransactionService";
import { blockCardService } from '../services/blockCardService';
import { unblockCardService } from "../services/unblockCardService";

export async function createCard(req: Request, res: Response){
    const apiKey = req.headers['x-api-key'] as string;
    const { employeeId, type } = req.body;
    
    await createCardService(apiKey, employeeId, type);
    res.status(200).send("Card created.");
}


export async function activateCard(req: Request, res: Response){
    const { id } = req.params;
    const { cvc, password } = req.body;

    await activateCardService(Number(id), cvc, password);

    res.status(200).send("Card activated.");
}


export async function getCardTransactions(req: Request, res: Response){
    const { number, cardholderName, expirationDate } = req.body;
    
    const cardTransactions = await getCardTransactionsService(number, cardholderName, expirationDate);

    res.status(200).send(cardTransactions);
}


export async function blockCard(req: Request, res: Response){
    const { id, password } : { id: number, password: string } = res.locals.body;

    await blockCardService(id, password);

    res.status(200).send("Card blocked.");
}

export async function unblockCard(req: Request, res: Response){
    const { id, password } : { id: number, password: string } = res.locals.body;

    await unblockCardService(id, password);

    res.status(200).send("Card unblocked.");
}