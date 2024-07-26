import {
  loginTCservice,
  logoutTCservice,
} from '#services/auth/turboCarsAuthService.js';

export const loginTC = async (req, res) => {
  try {
    const { username, password } = req.body;

    const cookies = await loginTCservice(username, password);

    res.cookie('turboCarsCookies', JSON.stringify(cookies), { httpOnly: true });

    res.json({ success: true, message: 'Logged in to Turbo Cars' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logoutTC = async (req, res) => {
  try {
    const cookies = JSON.parse(req.cookies.turboCarsCookies || '[]');

    await logoutTCservice(cookies);

    res.clearCookie('turboCarsCookies');

    res.json({ success: true, message: 'Logged out from Turbo Cars' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
