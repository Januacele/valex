import {Request, Response, NextFunction} from 'express';

export function errorHandle(error: any, req: Request, res: Response, next: NextFunction){
    if(error.type ==="error_not_found") return res.status(404).send(error.message);
    if(error.type ==="error_conflict") return res.status(404).send(error.message);
    if(error.type ==="error_bad_request") return res.status(404).send(error.message);
    if(error.type ==="error_unprocessable_entity") return res.status(404).send(error.message);

    return res.sendStatus(500);
}