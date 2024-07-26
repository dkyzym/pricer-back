import { searchCodeTurboCarsService } from '#services/turboCarsService.js';
import { searchUGService } from '#services/ugService.js';

export const searchCodeTurboCars = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code.trim()) {
      return res.status(400).json({ success: false, message: 'Empty field' });
    }

    const cookies = JSON.parse(req.cookies.turboCarsCookies || '[]');
    const data = await searchCodeTurboCarsService(code, cookies);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchUG = async (req, res) => {
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
    console.error('Error in searchUG:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
