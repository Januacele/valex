import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import errorResponses from "../Responses/errorResponses";


export default function validSchema(schema: ObjectSchema){
    return async (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);

    if(validation.error){
        return errorResponses.badRequest("Data");
    }
    next();
    };
}