import { Router, type IRouter } from "express";
import healthRouter from "./health";
import bencanaRouter from "./bencana";

const router: IRouter = Router();

router.use(healthRouter);
router.use(bencanaRouter);

export default router;
