import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export default function validSchema(schema: ObjectSchema) {
    console.log("entrei na função validSchema")
    return (req: Request, res: Response, next: NextFunction) => {
        console.log("passei do return do validSchema")
      const validation = schema.validate(req.body);
      if (validation.error) {
        return res.status(422).send(validation.error);
      }
      console.log("passei completo no validchema");
      console.log(validation);
      next();
    };
  }