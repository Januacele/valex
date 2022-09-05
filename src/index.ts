import express from "express";
import "express-async-errors";
import cors from "cors";
import router from './routes/index'
import { errorHandle } from "./middlewares/errorHandlerMiddleware";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandle);

export default app;