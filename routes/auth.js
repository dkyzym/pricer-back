import { loginTC, logoutTC } from '#controllers/auth/tcAuthController.js';
import { loginUG, logoutUG } from '#controllers/auth/ugAuthController.js';
import express from 'express';

const router = express.Router();

router.get('/logout-ug', logoutUG);
router.get('/logout-turbocars', logoutTC);
router.post('/login-tc', loginTC);
router.post('/login-ug', loginUG);

export default router;
