import { Router } from "express";
import validSchema from "../middlewares/validSchemaMiddleware";
import paymentSchema from "../schemas/paymentSchema";
import { pay } from '../controllers/paymentController'

const paymentRouter = Router();

paymentRouter.post("/payments", validSchema(paymentSchema), pay);

export default paymentRouter;