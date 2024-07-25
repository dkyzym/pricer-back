import { RouteNotFoundError } from '#helpers/errors.js';
import { error } from '#middlewares/errors.middleware.js';
import axios from 'axios';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import iconv from 'iconv-lite';
import * as cheerio from 'cheerio';

const app = express();

const { PORT = 3000 } = process.env;
const CLIENT_URL = 'http://localhost:5173';

const corsOptions = {
  origin: `${CLIENT_URL}`,
  credentials: true,
};

app.use(morgan('short'));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
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

    const decodedResponse = iconv.decode(response.data, 'windows-1251');
    console.log('Response Data:', decodedResponse);

    // Сохраняем куки на сервере
    const cookies = response.headers['set-cookie'];
    res.cookie('cookies', JSON.stringify(cookies), { httpOnly: true });

    res.json({ success: true, message: 'Logged in' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

app.get('/check-login', async (req, res) => {
  try {
    // Получаем куки из запроса
    const cookies = JSON.parse(req.cookies.cookies || '[]');

    const response = await axios.get('https://turbo-cars.net/office/', {
      headers: {
        Cookie: cookies.join('; '),
      },
    });

    res.json({ loggedIn: true, data: response.data });
  } catch (error) {
    console.error('Check login error:', error);
    res.status(500).json({ loggedIn: false, message: 'Not logged in' });
  }
});

app.get('/search-code', async (req, res) => {
  try {
    const { code } = req.query;
    const cookies = JSON.parse(req.cookies.cookies || '[]');

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

    // Декодирование ответа из windows-1251 в UTF-8
    const decodedResponse = iconv.decode(response.data, 'windows-1251');

    // Парсинг HTML с использованием cheerio
    const $ = cheerio.load(decodedResponse);

    // Извлечение нужных данных
    const data = $('body').html();
    const table = $('#maintbl').html();

    res.json({ success: true, data });
  } catch (error) {
    console.error('Search code error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch data' });
  }
});

// Route not found error
app.use(() => {
  throw new RouteNotFoundError();
});

// Errors handler
app.use(error);

const start = async () => {
  try {
    const server = app.listen(PORT, () => {
      console.log(
        chalk.cyan.italic(
          `Server is running. Use port: ${server.address().port}`
        )
      );
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
