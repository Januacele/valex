import { Router } from "express";
import validSchema from "../middlewares/validSchemaMiddleware";
import { checkApiKey } from "../middlewares/cardMIddleware";
import rechargeCardSchema from "../schemas/rechargeSchema";
import { rechargeCard } from "../controllers/rechargeController";

const rechargeRouter = Router();

rechargeRouter.post("/recharge",
    validSchema(rechargeCardSchema),
    checkApiKey,
    rechargeCard
);

export default rechargeRouter;