const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

app.post('/exchange_code', async (req, res) => {
    const { code } = req.body;

    try {
        // TikTok token exchange request
        const response = await axios.post('https://open.tiktok.com/oauth/token/', {
            client_key: 'awgwkcmj03d26unf', // Replace with your TikTok client ID
            client_secret: '9btpJ3KFayCAsqlnwdSNQrG5QA9ZOiCl', // Replace with your TikTok client secret
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: 'https://my-tiktok-app.netlify.app/callback', // Your callback URL
        });

        const accessToken = response.data.access_token;
        res.json({ accessToken });
    } catch (error) {
        console.error('Error exchanging code for token:', error);
        res.status(500).json({ error: 'Failed to exchange code for token' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
