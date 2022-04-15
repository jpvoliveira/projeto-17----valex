import { Router } from "express";
import * as cardController from '../controllers/cardController.js'

const cardRouter = Router()

cardRouter.get('/card/create', cardController.cardCreate)

export default cardRouter