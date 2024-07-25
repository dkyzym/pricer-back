import axios from 'axios';

import { parseSetCookieHeader } from '../utils/cookieUtils.js';
import { Credentials } from '../utils/constants.js';

export const loginToTurboCarsService = async (username, password) => {
  const response = await axios.post(
    'https://turbo-cars.net/office/SECURE.asp',
    `CODE=${username}&PASSWORD=${password}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      responseType: 'arraybuffer',
    }
  );

  // checkIsLoggedIn(response?.data, Credentials.TurboCarsUserID);

  const cookies = parseSetCookieHeader(response.headers['set-cookie']);
  return cookies;
};

export const loginToUGService = async (username, password) => {
  const response = await axios.post(
    'https://ugautopart.ru/',
    `login=${encodeURIComponent(username)}&pass=${encodeURIComponent(password)}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
    }
  );

  // checkIsLoggedIn(response?.data, Credentials.UGID);

  const cookies = parseSetCookieHeader(response.headers['set-cookie']);
  return cookies;
};
