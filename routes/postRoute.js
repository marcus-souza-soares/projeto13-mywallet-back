import { validateUser } from "../middlewares/validadates.js";
import { Router } from 'express';
import {orderGet, createOrder} from "../controllers/orderController.js";

const router = Router();

router.get("/wallet", validateUser, orderGet);
router.post("/wallet", validateUser, createOrder);

export default router;