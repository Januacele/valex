import { Request, Response } from "express";
import { payment } from "../services/paymentService";


export async function pay(req: Request, res: Response) {
  const data = req.body;
  const { cardId, password, businessId, amount } = data;

  await payment(cardId, password, businessId, amount);
  
  res.sendStatus(201);
}