import {
  loginUGservice,
  logoutUGservice,
} from '#services/auth/ugAuthService.js';
import { setCookie, clearCookie } from '#utils/cookieHelpers.js';

export const loginUG = async (req, res) => {
  const { username, password } = req.body;

  const cookies = await loginUGservice(username, password);
  console.log('UG', cookies);
  setCookie(res, 'ugCookies', cookies);

  res.json({ success: true, message: 'Logged in to UG Auto Parts' });
};

export const logoutUG = async (req, res) => {
  const cookies = JSON.parse(req.cookies.ugCookies || '[]');

  await logoutUGservice(cookies);

  clearCookie(res, 'ugCookies');

  res.json({ success: true, message: 'Logged out from UG Auto Parts' });
};
