import { searchUGService } from '#services/ugService.js';

export const fastSearchUG = async (req, res) => {
  try {
    const { term, locale } = req.query;

    if (!term.trim()) {
      return res
        .status(400)
        .json({ success: false, message: 'Empty search term' });
    }

    const cookies = JSON.parse(req.cookies.ugCookies || '[]');

    const data = await searchUGService(term, locale, cookies);

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error in fastSearchUG:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
