import { Router } from 'express';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import { loginTC, logoutTC } from '#controllers/auth/tcAuthController.js';
import { loginUG, logoutUG } from '#controllers/auth/ugAuthController.js';

const router = Router();

router.get('/logout/tc', ctrlWrapper(logoutTC));
router.get('/logout/ug', ctrlWrapper(logoutUG));
router.post('/login/tc', ctrlWrapper(loginTC));
router.post('/login/ug', ctrlWrapper(loginUG));

export default router;
