import { parseSetCookieHeader } from '#utils/cookieUtils.js';

export const loginUGservice = async (username, password) => {
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

  const cookies = parseSetCookieHeader(response.headers['set-cookie']);
  return cookies;
};

export const logoutUGservice = async (cookies) => {
  try {
    const response = await axios.get('https://ugautopart.ru/?logout', {
      headers: {
        Cookie: cookies.join('; '),
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      },
      withCredentials: true,
    });

    const setCookies = response.headers['set-cookie'] || [];
    const isLoggedOut = setCookies.some((cookie) =>
      cookie.includes('PHPSESSID=')
    );

    if (!isLoggedOut) {
      throw new Error('Failed to log out');
    }

    const newCookies = parseSetCookieHeader(setCookies);
    return newCookies;
  } catch (error) {
    console.error('Logout error:', error.message);
    throw error;
  }
};
