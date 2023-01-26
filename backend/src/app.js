const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const postRouter = require('./routers/post.router');

const app = express();

app.use(cors());
// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/posts', postRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app