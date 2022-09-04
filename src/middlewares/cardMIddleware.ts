import { Request, Response, NextFunction } from 'express';
import * as companyRepository from '../repositories/companyRepository';
import errorResponses from '../Responses/errorResponses';
import * as cardRepository from '../repositories/cardRepository';

export async function checkApiKey(req: Request, res: Response, next: NextFunction){
    const apiKey = req.headers['x-api-key']?.toString();
    if(!apiKey){
        return errorResponses.unauthorized("Data")
    }
        next();
}

export async function validateApiKey(req: Request, res: Response, next: NextFunction){
    const apiKey = req.headers['x-api-key']?.toString();
    const company = await companyRepository.findByApiKey(apiKey!.toString());
    if(!company){
        return errorResponses.unauthorized("Your company was"); 
    }
    next();
}

export async function checkcardType(req: Request, res: Response, next: NextFunction){
    const { type } : { type: string } = res.locals.body;

    if(!cardRepository.isTransactionType(type)){
        return errorResponses.notFound("Card type");
    }
    next();
}