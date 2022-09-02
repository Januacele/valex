import { Router } from "express";
import cardRouter from '../routes/cardsRouter';

const router = Router();


router.use(cardRouter); 

export default router;