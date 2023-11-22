const express = require('express');
const ErrorHandler = require('./middleware/error');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDatabase = require('./db/Database');

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: './backend/config/.env',
  });
}

connectDatabase();

const user = require('./controller/user');
app.use('/api/v2/user', user);

app.use(ErrorHandler);

module.exports = app;
