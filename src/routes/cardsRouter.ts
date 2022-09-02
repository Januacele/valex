import { Router } from "express";
import * as cardsController from '../controllers/cardsController';

const cardRouter = Router();



cardRouter.get("/card", cardsController.createCard);



export default cardRouter;