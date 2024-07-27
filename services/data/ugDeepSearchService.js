import { checkIsLoggedIn } from '#utils/checkIsLoggedIn.js';
import { Credentials } from '#utils/constants.js';
import { loadHtml } from '#utils/htmlParser.js';
import { parseRows } from '#utils/rowParser.js';
import axios from 'axios';
import * as cheerio from 'cheerio';

export const deepSearchUGservice = async (pcode, cookies) => {
  try {
    const headers = {
      Cookie: cookies.join('; '),
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language':
        'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6,sr;q=0.5',
      Referer: 'https://ugautopart.ru/?FranchiseeId=3993538',
    };

    const response = await axios.get(
      `https://ugautopart.ru/search?pcode=${pcode}`,
      {
        headers: headers,
        responseType: 'html',
        withCredentials: true,
      }
    );

    checkIsLoggedIn(response.data, Credentials.UGID);

    const $ = loadHtml(response.data);
    const data = parseRows($);

    return data;
  } catch (error) {
    console.error('Error in fastSearchUGservice:', error.message);
    throw new Error('Failed to fetch data from UG Auto Parts');
  }
};
