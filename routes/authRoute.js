import { Router } from 'express';
import { loginUser } from "../controllers//authController.js";
import { validateLogin } from "../middlewares/validadates.js"

const router = Router();

router.post('/login', validateLogin, loginUser);

export default router;