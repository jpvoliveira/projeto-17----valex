import { Router } from "express";
import * as cardController from '../controllers/cardController.js'

const cardRouter = Router()

cardRouter.get('/card/create', cardController.cardCreate)
cardRouter.get('/card/active', cardController.cardActive)
cardRouter.get('/card/view', cardController.cardView)

export default cardRouter