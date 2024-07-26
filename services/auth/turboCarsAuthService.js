import { parseSetCookieHeader } from '#utils/cookieUtils.js';

export const loginTCservice = async (username, password) => {
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

  const cookies = parseSetCookieHeader(response.headers['set-cookie']);
  return cookies;
};

export const logoutTCservice = async (cookies) => {
  try {
    const response = await axios.get(
      'https://turbo-cars.net/office/login.asp?mode=new',
      {
        headers: {
          Cookie: cookies.join('; '),
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        },
        withCredentials: true,
        responseType: 'arraybuffer',
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to log out');
    }

    return [];
  } catch (error) {
    console.error('Logout error:', error.message);
    throw error;
  }
};
