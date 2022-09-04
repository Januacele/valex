import express from "express";
import cors from "cors";
import "express-async-errors";
import router from './routes/index'
import { errorHandle } from "./middlewares/errorHandlerMiddleware";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandle);

export default app;