import { Router } from "express";
import * as cardsController from '../controllers/cardsController';

const cardRouter = Router();



cardRouter.post("/card", cardsController.createCard);


export default cardRouter;