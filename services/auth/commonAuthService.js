import axios from 'axios';
import { parseSetCookieHeader } from '#utils/cookieUtils.js';

// General function to make POST requests
export const makePostRequest = async (url, data, headers = {}) => {
  try {
    const response = await axios.post(url, data, {
      headers,
      withCredentials: true,
    });
    if (response.status !== 200) {
      throw new Error(`Failed to make POST request to ${url}`);
    }

    return response;
  } catch (error) {
    console.error(`POST request error: ${error.message}`);
    throw error;
  }
};

// General function to make GET requests
export const makeGetRequest = async (url, headers = {}) => {
  try {
    const response = await axios.get(url, { headers, withCredentials: true });
    if (response.status !== 200) {
      throw new Error(`Failed to make GET request to ${url}`);
    }

    return response;
  } catch (error) {
    console.error(`GET request error: ${error.message}`);
    throw error;
  }
};

// General function to parse cookies from response
export const getCookiesFromResponse = (response) => {
  const setCookies = response.headers['set-cookie'] || [];
  return parseSetCookieHeader(setCookies);
};
