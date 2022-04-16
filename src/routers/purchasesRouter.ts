import { Router } from "express";
import * as purchasesController from '../controllers/purchasesController.js'

const purchasesRouter = Router()

purchasesRouter.get('/purchases', purchasesController.purchases)

export default purchasesRouter