import axios from 'axios';
import { getCookiesFromResponse } from './commonAuthService.js';

import { checkIsLoggedIn } from '#utils/checkIsLoggedIn.js';
import { Credentials } from '#utils/constants.js';
import { defaultHeaders, ugLoginHeaders } from '#utils/defaultHeaders.js';

const UG_LOGIN_URL = 'https://ugautopart.ru/?FranchiseeId=3993538';
const UG_LOGOUT_URL = 'https://ugautopart.ru/?FranchiseeId=3993538&logout';
const UG_LOGOUT_REDIRECT_URL = 'https://ugautopart.ru/?FranchiseeId=3993538';

export const loginUGservice = async (username, password) => {
  const data = new URLSearchParams();
  data.append('login', username);
  data.append('pass', password);

  const headers = ugLoginHeaders;

  const response = await axios.post(UG_LOGIN_URL, data, { headers });
  const cookies = getCookiesFromResponse(response);

  checkIsLoggedIn(response.data, Credentials.UGID);

  if (!cookies.some((cookie) => cookie.startsWith('ABCPUser'))) {
    throw new Error('Missing ABCPUser cookie');
  }

  return cookies;
};

export const logoutUGservice = async (cookies) => {
  const headers = {
    ...defaultHeaders,
    Referer: 'https://ugautopart.ru/?FranchiseeId=3993538',
  };

  await axios.get(UG_LOGOUT_URL, { headers });

  const response = await axios.get(UG_LOGOUT_REDIRECT_URL, { headers });

  const newCookies = getCookiesFromResponse(response);
  console.log('Received cookies on logout:', newCookies);

  const isLoggedOut = newCookies.some(
    (cookie) => !cookie.includes('ABCPUser=')
  );

  if (!isLoggedOut) {
    throw new Error('Failed to log out');
  }

  return newCookies;
};
