import axios from 'axios';

export const fastSearchUGservice = async (term, locale, cookies) => {
  try {
    const headers = {
      Cookie: cookies.join('; '),
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language':
        'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6,sr;q=0.5',
      'X-Requested-With': 'XMLHttpRequest',
    };

    const response = await axios.get(
      'https://ugautopart.ru/ajax/modules2/search.tips/get',
      {
        params: {
          term: encodeURIComponent(term),
          locale,
        },
        headers: headers,
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error in fastSearchUGservice:', error.message);
    throw new Error('Failed to fetch data from UG Auto Parts');
  }
};
