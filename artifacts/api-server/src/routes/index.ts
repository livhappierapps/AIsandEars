import { Router, type IRouter } from "express";
import healthRouter from "./health";
import productsRouter from "./products";
import checkoutRouter from "./checkout";
import aiTokenRouter from "./aiToken";
import grokVisionRouter from "./grokVision";

const router: IRouter = Router();

router.use(healthRouter);
router.use(productsRouter);
router.use(checkoutRouter);
router.use(aiTokenRouter);
router.use(grokVisionRouter);

export default router;
