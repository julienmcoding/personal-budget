const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Mount the existing apiRouter 
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

// Middleware CORS
const cors = require('cors');
app.use(cors());

app.get('/', (req,res) => {
    res.send('Hello, world');
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

module.exports = app;