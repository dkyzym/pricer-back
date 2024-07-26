import {
  loginUGservice,
  logoutUGservice,
} from '#services/auth/ugAuthService.js';

export const loginUG = async (req, res) => {
  try {
    const { username, password } = req.body;

    const cookies = await loginUGservice(username, password);

    res.cookie('ugCookies', JSON.stringify(cookies), {
      httpOnly: true,
    });

    res.json({ success: true, message: 'Logged in to UG Auto Parts' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logoutUG = async (req, res) => {
  try {
    const cookies = JSON.parse(req.cookies.ugCookies || '[]');

    await logoutUGservice(cookies);

    res.clearCookie('ugCookies');

    res.json({ success: true, message: 'Logged out from UG Auto Parts' });
  } catch (error) {
    console.error('Logout from UG error:', error.message);

    res.status(500).json({ success: false, message: error.message });
  }
};
