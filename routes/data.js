import express from 'express';
import {
  searchCodeTurboCars,
  searchCodeUG,
} from '../controllers/dataController.js';

const router = express.Router();

router.get('/search-code', searchCodeTurboCars);
router.get('/ug/search-code', searchCodeUG);

export default router;
