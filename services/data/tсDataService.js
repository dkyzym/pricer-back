import { checkIsLoggedIn } from '#utils/checkIsLoggedIn.js';
import { Credentials } from '#utils/constants.js';
import axios from 'axios';
import * as cheerio from 'cheerio';
import iconv from 'iconv-lite';

export const searchCodeTCservice = async (code, cookies) => {
  const response = await axios.get(
    `https://turbo-cars.net/office/SearchCodeG.asp?CODE=${encodeURIComponent(code)}`,
    {
      headers: {
        Cookie: cookies.join('; '),
        'Content-Type': 'text/html; charset=windows-1251',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
      responseType: 'arraybuffer',
    }
  );

  checkIsLoggedIn(response.data, Credentials.TurboCarsUserID);

  const decodedResponse = iconv.decode(response.data, 'windows-1251');
  const $ = cheerio.load(decodedResponse);

  const data = $('#maintbl').html();
  return data;
};
