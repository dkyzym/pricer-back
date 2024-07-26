import express from 'express';

import { searchCodeTC } from '#controllers/data/tcDataController.js';
import { fastSearchUG } from '#controllers/data/ugFastSearchDataController.js';

const router = express.Router();

router.get('/search-code', searchCodeTC);
router.get('/search-ug', fastSearchUG);

export default router;
