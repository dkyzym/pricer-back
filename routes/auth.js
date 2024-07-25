import express from 'express';
import { loginToTurboCars, loginToUG } from '../controllers/authController.js';

const router = express.Router();

router.post('/login-tc', loginToTurboCars);
router.post('/login-ug', loginToUG);

export default router;
