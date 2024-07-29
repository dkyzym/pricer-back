import { fastSearchUGservice } from '#services/data/ugFastSearchService.js';
import { checkEmptyField } from '#utils/validationHelpers.js';
import { ctrlWrapper } from '#middlewares/ctrlWrapper.js';
import { v4 as uuidv4 } from 'uuid';

export const fastSearchUG = ctrlWrapper(async (req, res) => {
  const { term, locale } = req.query;

  checkEmptyField(term, 'Empty search term');

  const cookies = JSON.parse(req.cookies.ugCookies || '[]');
  const data = await fastSearchUGservice(term, locale, cookies);

  const dataWithId = data.map((element) => {
    return { id: uuidv4(), ...element };
  });

  res.json({ success: true, data: dataWithId });
});
