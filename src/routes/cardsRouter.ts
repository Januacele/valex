import { Router } from "express";
import * as cardsController from '../controllers/cardsController';
import { checkApiKey, checkcardType } from "../middlewares/cardMIddleware";
import validSchema from "../middlewares/validSchemaMiddleware";
import createCardSchema from "../schemas/creatCardSchema";

const cardRouter = Router();



cardRouter.post("/card",
    checkApiKey,
    validSchema(createCardSchema),
    checkcardType,
    cardsController.createCard
);


export default cardRouter;