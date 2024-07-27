import { deepSearchUGservice } from '#services/data/ugDeepSearchService.js';
import { checkEmptyField } from '#utils/validationHelpers.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';

export const deepSearchUG = ctrlWrapper(async (req, res) => {
  const { pcode } = req.query;

  checkEmptyField(pcode, 'Empty search term');

  const cookies = JSON.parse(req.cookies.ugCookies || '[]');
  const data = await deepSearchUGservice(pcode, cookies);

  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  res.send({ success: true, data });
});
