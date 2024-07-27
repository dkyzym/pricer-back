import express from 'express';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import { searchCodeTC } from '#controllers/data/tcDataController.js';
import { fastSearchUG } from '#controllers/data/ugFastSearchDataController.js';
import { deepSearchUG } from '#controllers/data/ugDeepSearchDataController.js';

const router = express.Router();

router.get('/search-code', ctrlWrapper(searchCodeTC));
router.get('/search-ug', ctrlWrapper(fastSearchUG));
router.get('/search-ug/deep', ctrlWrapper(deepSearchUG));

export default router;
