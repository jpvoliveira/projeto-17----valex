import express, {json, Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import 'express-async-errors';
import cardRouter from './routers/cardRouter.js';
import { handleErrorMiddleware } from './middlewares/handleErrorMiddleware.js';
dotenv.config()

const app = express()

app.use(json())
app.use(cors())
app.use(cardRouter)
app.use(handleErrorMiddleware)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Running on ${port}`)
})