import { defaultHeaders } from '#utils/defaultHeaders.js';
import {
  makePostRequest,
  makeGetRequest,
  getCookiesFromResponse,
} from './commonAuthService.js';

const UG_LOGIN_URL = 'https://ugautopart.ru/';
const UG_LOGOUT_URL = 'https://ugautopart.ru/?logout';

export const loginUGservice = async (username, password) => {
  const data = `login=${encodeURIComponent(username)}&pass=${encodeURIComponent(password)}`;
  const headers = defaultHeaders;

  const response = await makePostRequest(UG_LOGIN_URL, data, headers);
  return getCookiesFromResponse(response);
};

export const logoutUGservice = async (cookies) => {
  const headers = {
    Cookie: cookies.join('; '),
    defaultHeaders,
  };

  const response = await makeGetRequest(UG_LOGOUT_URL, headers);
  const newCookies = getCookiesFromResponse(response);

  const isLoggedOut = newCookies.some((cookie) =>
    cookie.includes('PHPSESSID=')
  );

  if (!isLoggedOut) {
    throw new Error('Failed to log out');
  }

  return newCookies;
};
