import express from 'express';
import {
  searchCodeTurboCars,
  searchUG,
} from '../controllers/dataController.js';

const router = express.Router();

router.get('/search-code', searchCodeTurboCars);
router.get('/search-ug', searchUG);

export default router;
