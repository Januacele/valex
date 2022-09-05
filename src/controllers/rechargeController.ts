import { Request, Response } from "express";
import { rechargeCardService } from '../services/rechargeCardService';

export async function rechargeCard(req: Request, res: Response){
    const apiKey = req.headers['x-api-key'] as string;

    const { cardId, amount } = req.body;

    await rechargeCardService(apiKey, cardId, amount);

    res.status(200).send("Card recharged.");
}