import express from 'express';
import { loginToTurboCars, loginToUG } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginToTurboCars);
router.post('/new-supplier/login', loginToUG);

export default router;
