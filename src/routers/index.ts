import { Router } from "express";
import cardRouter from "./cardRouter.js";
import rechargeRouter from "./rechargeRouter.js";
import purchasesRouter from "./purchasesRouter.js";

const router = Router()

router.use(cardRouter)
router.use(rechargeRouter)
router.use(purchasesRouter)

export default router