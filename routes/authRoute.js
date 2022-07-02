import { Router } from 'express';
import { loginUser, createUser} from "../controllers//authController.js";
import { validateLogin, validateSignUp } from "../middlewares/validadates.js"

const router = Router();

router.post('/login', validateLogin, loginUser);
router.post('/sign-up', validateSignUp, createUser);

export default router;