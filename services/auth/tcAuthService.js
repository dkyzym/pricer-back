import { defaultHeaders } from '#utils/defaultHeaders.js';
import {
  makePostRequest,
  makeGetRequest,
  getCookiesFromResponse,
} from './commonAuthService.js';

const TC_LOGIN_URL = 'https://turbo-cars.net/office/SECURE.asp';
const TC_LOGOUT_URL = 'https://turbo-cars.net/office/login.asp?mode=new';

export const loginTCservice = async (username, password) => {
  const data = `CODE=${username}&PASSWORD=${password}`;
  const headers = defaultHeaders;

  const response = await makePostRequest(TC_LOGIN_URL, data, headers);
  return getCookiesFromResponse(response);
};

export const logoutTCservice = async (cookies) => {
  const headers = {
    Cookie: cookies.join('; '),
    defaultHeaders,
  };

  const response = await makeGetRequest(TC_LOGOUT_URL, headers);
  return [];
};
