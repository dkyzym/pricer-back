import express from 'express';
//const axios = require('axios');

const router = express.Router();

router.get('/test', async (req, res) => {
  res.status(200).json({ message: 'Hello from auth' });
});

export default router;
