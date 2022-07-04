import { validateUser } from "../middlewares/validadates.js";
import { Router } from 'express';
import {orderGet, createOrder, deleteOrder} from "../controllers/orderController.js";

const router = Router();

router.get("/wallet", validateUser, orderGet);
router.post("/wallet", validateUser, createOrder);
router.delete("/wallet/delete", deleteOrder);

export default router;