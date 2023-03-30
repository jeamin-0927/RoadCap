const express = require('express');
const app = express();
const path = require('path');


app.get('*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/../react/dist${req.originalUrl === '/' ? '/index.html' : req.originalUrl}`));
});

app.listen(3000, () => console.log('Lstening on port 3000!'));