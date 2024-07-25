import axios from 'axios';
import iconv from 'iconv-lite';
import { parseSetCookieHeader } from '../utils/cookieUtils.js';

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

  const decodedResponse = iconv.decode(response.data, 'windows-1251');

  const cookies = parseSetCookieHeader(response.headers['set-cookie']);
  return cookies;
};

export const loginToUGService = async (username, password) => {
  const response = await axios.post(
    'https://new-supplier.com/login',
    { username, password },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const cookies = parseSetCookieHeader(response.headers['set-cookie']);
  return cookies;
};
