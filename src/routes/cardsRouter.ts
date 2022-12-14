import { Router } from "express";
import * as cardsController from '../controllers/cardsController';
import { checkApiKey } from "../middlewares/cardMIddleware";
import validSchema from "../middlewares/validSchemaMiddleware";
import activateCardSchema from "../schemas/activateCardSchema";
import createCardSchema from "../schemas/creatCardSchema";
import getCardTransactionsSchema from "../schemas/getCardTransactionsSchema";
import blockUnblockCardSchema from '../schemas/blockUnblockCardSchema';

const cardRouter = Router();



cardRouter.post("/card",
    checkApiKey,
    validSchema(createCardSchema),    
    cardsController.createCard
);

cardRouter.patch("card/:id/activate",
    validSchema(activateCardSchema),
    cardsController.activateCard
);

cardRouter.get("/card",
    validSchema(getCardTransactionsSchema),
    cardsController.getCardTransactions
);

cardRouter.post("/card/block",
    validSchema(blockUnblockCardSchema),
    cardsController.blockCard
);


cardRouter.post("/card/unblock",
    validSchema(blockUnblockCardSchema),
    cardsController.unblockCard
);

export default cardRouter;