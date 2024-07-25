import express from 'express';
import {
  loginToTurboCars,
  loginToUG,
  logoutFromUG,
  logoutFromTurboCars,
} from '../controllers/authController.js';

const router = express.Router();

router.get('/logout-ug', logoutFromUG);
router.get('/logout-turbocars', logoutFromTurboCars);
router.post('/login-tc', loginToTurboCars);
router.post('/login-ug', loginToUG);

export default router;
