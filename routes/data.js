import express from 'express';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import { searchCodeTC } from '#controllers/data/tcDataController.js';
import { fastSearchUG } from '#controllers/data/ugFastSearchDataController.js';

const router = express.Router();

router.get('/search-code', ctrlWrapper(searchCodeTC));
router.get('/search-ug', ctrlWrapper(fastSearchUG));

export default router;
