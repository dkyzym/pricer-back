import axios from 'axios';

export const makePostRequest = async (url, data, headers) => {
  try {
    const response = await axios.post(url, data, {
      headers,
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to make POST request: ${error.message}`);
  }
};

export const makeGetRequest = async (url, headers) => {
  try {
    const response = await axios.get(url, { headers, withCredentials: true });
    return response;
  } catch (error) {
    throw new Error(`Failed to make GET request: ${error.message}`);
  }
};

export const getCookiesFromResponse = (response) => {
  const setCookieHeader = response.headers['set-cookie'];
  if (!setCookieHeader) {
    return [];
  }
  // Map to store unique cookies
  const cookiesMap = new Map();
  setCookieHeader.forEach((cookie) => {
    const [nameValue, ...rest] = cookie.split(';');
    const [name, value] = nameValue.split('=');
    cookiesMap.set(name, `${name}=${value}`);
  });
  return Array.from(cookiesMap.values());
};
