import { Router, type IRouter } from "express";
import healthRouter from "./health";
import desaRouter from "./desa";

const router: IRouter = Router();

router.use(healthRouter);
router.use(desaRouter);

export default router;
