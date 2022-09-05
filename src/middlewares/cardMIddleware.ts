import { Request, Response, NextFunction } from 'express';
import * as companyRepository from '../repositories/companyRepository';
import errorResponses from '../Responses/errorResponses';

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
