const express = require('express');

const { tryCatchWrapper } = require('../../helpers');
const { getNews } = require('../../controllers/news.controller');

const newsRouter = express.Router();
newsRouter.get('/', tryCatchWrapper(getNews));

module.exports = {
  newsRouter,
};
