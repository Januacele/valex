import { Request, Response } from "express";
import * as cardRepository from '../repositories/cardRepository';
import { createCardService } from "../services/cardService";

export async function createCard(req: Request, res: Response){
    const apiKey:any = req.headers['x-api-key'];
    const { employeeId, type } : { employeeId: number, type: cardRepository.TransactionTypes } = req.body;
    await createCardService(apiKey, employeeId, type);

    res.status(200).send("Card created.");
}
