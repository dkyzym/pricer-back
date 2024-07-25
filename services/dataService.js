import axios from 'axios';
import iconv from 'iconv-lite';
import * as cheerio from 'cheerio';

export const searchCodeTurboCarsService = async (code, cookies) => {
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

  const decodedResponse = iconv.decode(response.data, 'windows-1251');
  const $ = cheerio.load(decodedResponse);

  const data = $('#maintbl').html();
  return data;
};

export const searchCodeUGService = async (code, cookies) => {
  const response = await axios.get(
    `https://new-supplier.com/search?code=${encodeURIComponent(code)}`,
    {
      headers: {
        Cookie: cookies.join('; '),
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
    }
  );

  return response.data;
};
