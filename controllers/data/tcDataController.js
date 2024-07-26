import { searchCodeTCservice } from '#services/data/tсDataService.js';
import { checkEmptyField } from '#utils/validationHelpers.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';

export const searchCodeTC = ctrlWrapper(async (req, res) => {
  const { code } = req.query;

  checkEmptyField(code, 'Empty field');

  const cookies = JSON.parse(req.cookies.turboCarsCookies || '[]');
  const data = await searchCodeTCservice(code, cookies);

  res.json({ success: true, data });
});
