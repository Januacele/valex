import { Request, Response } from "express";
import * as cardRepository from '../repositories/cardRepository';
import { createCardService } from "../services/cardService";
import * as companyRepository from '../repositories/companyRepository';

export async function createCard(req: Request, res: Response){
    const apiKey:any = req.headers['x-api-key'];

    //To fix: find another away to located this line of code
    const company = await companyRepository.findByApiKey(apiKey.toString());

    const { employeeId, type } : { employeeId: number, type: cardRepository.TransactionTypes } = res.locals.body;

    await createCardService(company.id, employeeId, type);

    res.status(200).send("Card created.");

}
