import {
  loginToTurboCarsService,
  loginToUGService,
  logoutFromUGService,
  logoutFromTurboCarsService,
} from '../services/authService.js';

export const loginToTurboCars = async (req, res) => {
  try {
    const { username, password } = req.body;

    const cookies = await loginToTurboCarsService(username, password);

    res.cookie('turboCarsCookies', JSON.stringify(cookies), { httpOnly: true });

    res.json({ success: true, message: 'Logged in to Turbo Cars' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginToUG = async (req, res) => {
  try {
    const { username, password } = req.body;

    const cookies = await loginToUGService(username, password);

    res.cookie('ugCookies', JSON.stringify(cookies), {
      httpOnly: true,
    });

    res.json({ success: true, message: 'Logged in to UG Auto Parts' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logoutFromUG = async (req, res) => {
  try {
    const cookies = JSON.parse(req.cookies.ugCookies || '[]');

    await logoutFromUGService(cookies);

    res.clearCookie('ugCookies');

    res.json({ success: true, message: 'Logged out from UG Auto Parts' });
  } catch (error) {
    console.error('Logout from UG error:', error.message);

    res.status(500).json({ success: false, message: error.message });
  }
};

export const logoutFromTurboCars = async (req, res) => {
  try {
    const cookies = JSON.parse(req.cookies.turboCarsCookies || '[]');

    await logoutFromTurboCarsService(cookies);

    res.clearCookie('turboCarsCookies');

    res.json({ success: true, message: 'Logged out from Turbo Cars' });
  } catch (error) {
    console.error('Logout from Turbo Cars error:', error.message);

    res.status(500).json({ success: false, message: error.message });
  }
};
