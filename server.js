const express = require('express');
const app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

// Middleware CORS
const cors = require('cors');
app.use(cors());

// Add middware for parsing request bodies here:
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Mount the existing apiRouter 
const apiRouter = require('./server/api');
app.use('/api', apiRouter);


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

module.exports = app;