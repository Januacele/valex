import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export default function validSchema(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const validation = schema.validate(req.body);
      if (validation.error) {
        return res.status(422).send(validation.error);
      }
      next();
    };
  }