import { Router } from "express";
import userRouter from "./user";
import adminRouter from "./admin";
import adminEventRouter from "./admin/event";
import adminLocationRouter from "./admin/location";

const router = Router();

router.use("/user", userRouter)
router.use("/admin/event", adminEventRouter)
router.use("/admin/location", adminLocationRouter)
router.use("/admin", adminRouter)

if(process.env.NODE_ENV !== 'production') {
    router.use("/test", testRouter);
}

export default router;