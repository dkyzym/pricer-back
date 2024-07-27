import {
  loginTCservice,
  logoutTCservice,
} from '#services/auth/tcAuthService.js';
import { setCookie, clearCookie } from '#utils/cookieHelpers.js';

export const loginTC = async (req, res) => {
  const { username, password } = req.body;

  const cookies = await loginTCservice(username, password);
  console.log(cookies);
  setCookie(res, 'turboCarsCookies', cookies);

  res.json({ success: true, message: 'Logged in to Turbo Cars' });
};

export const logoutTC = async (req, res) => {
  const cookies = JSON.parse(req.cookies.turboCarsCookies || '[]');

  await logoutTCservice(cookies);

  clearCookie(res, 'turboCarsCookies');

  res.json({ success: true, message: 'Logged out from Turbo Cars' });
};
