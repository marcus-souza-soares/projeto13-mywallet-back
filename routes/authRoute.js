import { Router } from 'express';
import { loginUser, createUser, userLogout } from "../controllers/authController.js";
import { validateLogin, validateSignUp } from "../middlewares/validadates.js"

const router = Router();

router.post('/login', validateLogin, loginUser);
router.post('/sign-up', validateSignUp, createUser);
router.delete('/logout', userLogout);

export default router;