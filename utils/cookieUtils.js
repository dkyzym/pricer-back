export const parseSetCookieHeader = (setCookieHeader) => {
  if (!setCookieHeader) return [];

  return setCookieHeader.map((cookie) => {
    const [cookieNameValue, ...cookieOptions] = cookie.split('; ');

    const [cookieName, cookieValue] = cookieNameValue.split('=');

    return `${cookieName}=${cookieValue}`;
  });
};
