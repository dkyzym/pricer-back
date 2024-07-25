import {
  loginToTurboCarsService,
  loginToUGService,
} from '../services/authService.js';

export const loginToTurboCars = async (req, res) => {
  try {
    const { username, password } = req.body;

    const cookies = await loginToTurboCarsService(username, password);

    res.cookie('turboCarsCookies', JSON.stringify(cookies), { httpOnly: true });

    res.json({ success: true, message: 'Logged in to Turbo Cars' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};

export const loginToUG = async (req, res) => {
  try {
    const { username, password } = req.body;
    const cookies = await loginToUGService(username, password);
    res.cookie('ugCookies', JSON.stringify(cookies), {
      httpOnly: true,
    });
    res.json({ success: true, message: 'Logged in to New Supplier' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};
