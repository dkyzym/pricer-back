import axios from 'axios';
import express from 'express';

const router = express.Router();

let cookies = {};

router.get('/check-login', async (_req, res) => {
  try {
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

export default router;
