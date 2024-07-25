import { searchCodeTurboCarsService } from '#services/turboCarsService.js';
import { searchCodeUGService } from '#services/ugService.js';

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

export const searchCodeUG = async (req, res) => {
  try {
    const { code } = req.query;

    const cookies = JSON.parse(req.cookies.ugCookies || '[]');

    const data = await searchCodeUGService(code, cookies);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch data' });
  }
};
