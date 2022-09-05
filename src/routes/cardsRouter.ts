import { Router } from "express";
import * as cardsController from '../controllers/cardsController';
import { checkApiKey, checkcardType } from "../middlewares/cardMIddleware";
import validSchema from "../middlewares/validSchemaMiddleware";
import activateCardSchema from "../schemas/activateCardSchema";
import createCardSchema from "../schemas/creatCardSchema";
import getCardTransactionsSchema from "../schemas/getCardTransactionsSchema";

const cardRouter = Router();



cardRouter.post("/card",
    validSchema(createCardSchema),    
    checkApiKey,
    checkcardType,
    cardsController.createCard
);

cardRouter.post("card/activate",
    validSchema(activateCardSchema),
    cardsController.activateCard
);

cardRouter.get("/card",
    validSchema(getCardTransactionsSchema),
    cardsController.getCardTransactions
);


export default cardRouter;