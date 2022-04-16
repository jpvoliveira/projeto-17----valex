import { Router } from "express";
import * as rechargeController from '../controllers/rechargeController.js'

const rechargeRouter = Router()

rechargeRouter.get('/recharge', rechargeController.rechargeCard)

export default rechargeRouter