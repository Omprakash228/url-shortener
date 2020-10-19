const express = require('express');
require('./db/mongoose');
const shortenerRouter = require('./routers/shortener');
const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(shortenerRouter);

app.listen(port, () => { console.log("Server is up!!")});