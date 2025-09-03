const express = require('express');
const getFileInfo = require('./fileinfo');
const parseUrl = require('./urlparser');
const app = express();

app.get('/test',(req,res)=>{
    res.send("Test route is working!")
})

app.get('/fileinfo', (req, res) => {
    const filepath = req.query.filepath;
    if (!filepath) {
        return res.status(400).json({ error: 'filepath query parameter is required' });
    }
    const fileInfo = getFileInfo(filepath);
    res.json(fileInfo);
});

app.get('/parseurl', (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ error: 'url query parameter is required' });
    }
    try {
        const urlParts = parseUrl(url);
        res.json(urlParts);
    } catch (error) {
        res.status(400).json({ error: 'Invalid URL provided' });
    }
});

app.listen(3000)