import axios from 'axios';
import express from 'express';

const router = express.Router();

let cookies = {};

router.post('/login', async (req, res) => {
  try {
    console.log(req);
    const { username, password } = req.body;

    const response = await axios.post(
      'https://turbo-cars.net/office/SECURE.asp',
      {
        CODE: username,
        PASSWORD: password,
      }
    );

    // Сохраняем куки из заголовков ответа
    cookies = response.headers['set-cookie'];

    res.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

export default router;
