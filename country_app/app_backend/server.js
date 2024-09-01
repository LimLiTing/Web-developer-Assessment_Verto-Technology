const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/countries', async (req, res) => {
    try {
        const countriesData = await axios.get('https://restcountries.com/v3.1/all');
        res.json(countriesData.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch countries data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
