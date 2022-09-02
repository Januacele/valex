import { Request, Response } from "express";

export async function createCard(req: Request, res: Response){
    res.status(200).send("Até aqui ta funcionando");
    console.log("Até aqui ta funcionando")
}