const { dbNews } = require('../models/news');


async function getNews(req, res, next) {
    const news = await dbNews.find();

    return res.status(200).json(news)
    } 

    module.exports = {
        getNews,
    };