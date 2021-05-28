const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use("/covidsafar/static", express.static(path.join(__dirname, 'build/static'), { maxAge: '30m' }));
app.use("/covidsafar", express.static(path.join(__dirname, 'build'), { maxAge: '30m' }));


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000);
